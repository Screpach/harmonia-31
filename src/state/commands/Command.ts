export type CommandMeta = {
  readonly commandId: string;
  readonly issuedAt: string;
  readonly source: 'system' | 'user';
};

export type NoOpCommand = {
  readonly kind: 'noop';
  readonly meta: CommandMeta;
  readonly reason?: string;
};

export type Command = NoOpCommand;
