import { createRotateLogStream, FormatBuilder, toolkit, TokenParser } from './toolkit';

export const FileStreamAll = (options = {}) =>
	toolkit(
		(tokens, req, res) => {
			const parserToken = TokenParser.parse(tokens, req, res);

			return FormatBuilder.build(null, parserToken);
		},
		{
			stream: createRotateLogStream({ signature: 'morgan-all', ...options })
		}
	);
