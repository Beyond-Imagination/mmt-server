import { createStream } from 'rotating-file-stream';
import dayjs from 'dayjs';

function createRotateLogStream({
	signature = '',
	size = '10M',
	interval = '1d', // rotate daily
	path = './.log',
	// logDirectory = "./.log",
	// path = join(__dirname, LOG_DIRECTORY_PATH),
	compress = 'gzip',
	intervalBoundary = true,
	initialRotation = true
} = {}): any {
	const pad = num => (num > 9 ? "" : "0") + num;
	const generator = (time, index) => {
		if (!time) {
			return `${signature}.log`;
		}

		const now = dayjs().locale('ko');

		const month = now.year() + "" + pad(now.month() + 1);
		const day = pad(now.day());
		const hour = pad(now.hour());
		const minute = pad(now.minute());

		return `/${month}/${month}.${day}-${hour}.${minute}-${index}.log`;
	};

	return createStream(generator, {
		size,
		interval,
		path,
		compress,
		intervalBoundary,
		initialRotation
	});
}

export { createRotateLogStream };
