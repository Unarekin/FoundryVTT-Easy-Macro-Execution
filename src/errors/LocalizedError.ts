const TRANSLATION_KEY = "MACRO-EXECUTOR";

export class LocalizedError extends Error {
  constructor(message?: string, subs?: Record<string, string>) {
    if (message) super(game.i18n?.format(`${TRANSLATION_KEY}.ERRORS.${message}`, subs))
    else super();
  }
}