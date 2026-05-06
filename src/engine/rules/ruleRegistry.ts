import type { RulePlugin, RulePluginResult } from './RulePlugin';
import type { RuleContext } from './RuleContext';

export type RuleRegistry = {
  register: (plugin: RulePlugin) => void;
  list: () => readonly RulePlugin[];
  runAll: (context: RuleContext) => readonly { pluginId: string; result: RulePluginResult }[];
};

export function createRuleRegistry(): RuleRegistry {
  const plugins = new Map<string, RulePlugin>();

  return {
    register(plugin) {
      plugins.set(plugin.id, plugin);
    },
    list() {
      return [...plugins.values()];
    },
    runAll(context) {
      return [...plugins.values()].map((plugin) => {
        if (plugin.requiredData.kind === 'external' && !context.externalData) {
          return {
            pluginId: plugin.id,
            result: {
              status: 'unavailable',
              diagnostics: [],
              reason: plugin.requiredData.reason,
            },
          };
        }

        return {
          pluginId: plugin.id,
          result: plugin.analyze(context),
        };
      });
    },
  };
}
