import { createRotateLogStream, FormatBuilder, toolkit, TokenParser } from './toolkit';

export const FileStreamOnlyError = (options = {}) =>
	toolkit(
		(tokens, req, res) => {
			const parserToken = TokenParser.parse(tokens, req, res);

			return FormatBuilder.build(null, parserToken);
		},
		{
			stream: createRotateLogStream({ signature: 'morgan-error' }),

			skip(req, res) {
				return res.statusCode < 400;
			},
			...options
		}
	);
