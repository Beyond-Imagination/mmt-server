import morgan from 'morgan';
import dayjs from "dayjs";

import { TokenParser } from './token-parser';
import { TokenPainter } from './token-painter';
import { FormatBuilder } from './format-builder';
import { createRotateLogStream } from './create-rotate-log-stream';

function toolkit(format: any, option: any): any {
	morgan.token('date', () => {
		return dayjs().locale('ko').format('YYYY-MM-DD HH:mm:ss');
	});

	return morgan(format, option);
}

export { toolkit, TokenParser, TokenPainter, FormatBuilder, createRotateLogStream };
