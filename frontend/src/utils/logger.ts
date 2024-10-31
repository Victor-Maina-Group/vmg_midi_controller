type LoggerOptions = {
  disabled: boolean;
};

const LOGGER_ENABLED = import.meta.env.VITE_LOGGER_ENABLED === "true";
const init_opts: LoggerOptions = {
  disabled: LOGGER_ENABLED || false,
};

export function logger<T>(target: T, opts: LoggerOptions = init_opts) {
  if (!opts.disabled) return;

  if (target instanceof Array) console.log(...target);
  else console.log(target);
}
