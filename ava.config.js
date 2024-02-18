module.exports = {
  extensions: ["js", "cjs", "mjs", "ts", "tsx"],
  require: ["@swc-node/register"],
  files: ["packages/**/*.spec.{ts,tsx}"]
}
