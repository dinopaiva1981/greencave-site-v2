/**
 * migration.js — Greencave CMS
 *
 * Migrações de schema do content.json. Cada função recebe o objeto de dados
 * na versão anterior e retorna o objeto já ajustado para a próxima versão.
 * O admin.html aplica todas as migrações pendentes, em ordem, sempre que
 * carrega um content.json com schemaVersion mais antigo que o atual.
 *
 * Regra: uma migração NUNCA apaga dado do usuário. Ela só adiciona campos
 * novos com valores padrão seguros, ou reformata uma estrutura antiga para
 * a nova forma, preservando o conteúdo.
 *
 * Como adicionar uma nova migração:
 *   1. Escreva a função migrate_X_to_Y(data) abaixo.
 *   2. Registre-a no objeto MIGRATIONS, na ordem correta.
 *   3. Atualize CURRENT_SCHEMA_VERSION no config.json.
 */

function genId(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 10);
}

// Exemplo de migração real: garante que todo bloco repetível tenha um "id"
// estável. Sites migrados de antes da v1.0.0 (sem IDs) ganham um ID novo,
// gerado uma única vez nesta migração — depois disso, o ID nunca muda.
function migrate_0_9_0_to_1_0_0(data) {
  const ensureIds = (arr, prefix) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(item => { if (item && typeof item === "object" && !item.id) item.id = genId(prefix); });
  };
  ensureIds(data.works, "work");
  ensureIds(data.services, "svc");
  ensureIds(data.quem, "quem");
  if (data.lab && Array.isArray(data.lab.items)) ensureIds(data.lab.items, "lab");
  if (Array.isArray(data.awards)) {
    ensureIds(data.awards, "awardgrp");
    data.awards.forEach(g => { if (g && Array.isArray(g.items)) ensureIds(g.items, "award"); });
  }
  if (data.about) {
    ensureIds(data.about.team, "team");
    ensureIds(data.about.values, "value");
  }
  data.schemaVersion = "1.0.0";
  return data;
}

// Ordem de aplicação: da versão mais antiga para a mais nova.
const MIGRATIONS = [
  { from: "0.9.0", to: "1.0.0", run: migrate_0_9_0_to_1_0_0 }
  // Próxima migração real entra aqui, ex.:
  // { from: "1.0.0", to: "1.1.0", run: migrate_1_0_0_to_1_1_0 }
];

/**
 * Aplica todas as migrações pendentes, em sequência, até alcançar targetVersion.
 * Se o schema já estiver atualizado, não faz nada (idempotente).
 */
function runMigrations(data, targetVersion) {
  const applied = [];
  let current = data.schemaVersion || "0.9.0";
  let guard = 0;
  while (current !== targetVersion && guard < MIGRATIONS.length + 1) {
    const step = MIGRATIONS.find(m => m.from === current);
    if (!step) break; // não há caminho de migração conhecido — para com segurança
    data = step.run(data);
    applied.push(`${step.from} → ${step.to}`);
    current = step.to;
    guard++;
  }
  return { data, applied, finalVersion: current };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { runMigrations, MIGRATIONS };
}
if (typeof window !== "undefined") {
  window.GreencaveMigrations = { runMigrations, MIGRATIONS };
}
