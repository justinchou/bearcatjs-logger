const funcs = { env: doEnv, args: doArgs, opts: doOpts };

function doReplace(src, opts) {
	if (!src) return src;

	const ptn = /\$\{(.*?)\}/g;
	let m,
		pro,
		ts,
		scope,
		name,
		defaultValue,
		func,
		res = '',
		lastIndex = 0;

	while ((m = ptn.exec(src))) {
		pro = m[1];
		ts = pro.split(':');
		if (ts.length !== 2 && ts.length !== 3) {
			res += pro;
			continue;
		}

		scope = ts[0];
		name = ts[1];
		if (ts.length === 3) defaultValue = ts[2];

		func = funcs[scope];
		if (!func && typeof func !== 'function') {
			res += pro;
			continue;
		}

		res += src.substring(lastIndex, m.index);
		lastIndex = ptn.lastIndex;
		res += func(name, opts) || defaultValue;
	}

	if (lastIndex < src.length) res += src.substring(lastIndex);

	return res;
}

function doEnv(name) {
	return process.env[name];
}

function doArgs(name) {
	return process.argv[name];
}

function doOpts(name, opts) {
	return opts ? opts[name] : undefined;
}

function replaceProperties(configObj, opts) {
	if (configObj instanceof Array) {
		for (let i = 0, l = configObj.length; i < l; i++) {
			configObj[i] = replaceProperties(configObj[i], opts);
		}
	} else if (typeof configObj === 'object') {
		let field;
		for (const f in configObj) {
			if (!configObj.hasOwnProperty(f)) {
				continue;
			}

			field = configObj[f];
			if (typeof field === 'string') {
				configObj[f] = doReplace(field, opts);
			} else if (typeof field === 'object') {
				configObj[f] = replaceProperties(field, opts);
			}
		}
	}

	return configObj;
}

module.exports = replaceProperties;
