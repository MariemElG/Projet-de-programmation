"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var electron = require("electron");
var os = require("os");
var path$3 = require("path");
var Store = require("electron-store");
var require$$0$3 = require("buffer");
var childProcess = require("child_process");
var process$2 = require("process");
var require$$0 = require("fs");
var url = require("url");
var require$$0$1 = require("assert");
var require$$2 = require("events");
var require$$0$2 = require("stream");
var require$$2$1 = require("util");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var os__default = /* @__PURE__ */ _interopDefaultLegacy(os);
var path__default = /* @__PURE__ */ _interopDefaultLegacy(path$3);
var Store__default = /* @__PURE__ */ _interopDefaultLegacy(Store);
var require$$0__default$3 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$3);
var childProcess__default = /* @__PURE__ */ _interopDefaultLegacy(childProcess);
var process__default = /* @__PURE__ */ _interopDefaultLegacy(process$2);
var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0);
var url__default = /* @__PURE__ */ _interopDefaultLegacy(url);
var require$$0__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
var require$$2__default = /* @__PURE__ */ _interopDefaultLegacy(require$$2);
var require$$0__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$2);
var require$$2__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$2$1);
const store = new Store__default["default"]();
electron.ipcMain.handle("electron-store", async (_event, methodSign, ...args) => {
  if (typeof store[methodSign] === "function") {
    return store[methodSign](...args);
  }
  return store[methodSign];
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var crossSpawn$1 = { exports: {} };
var windows = isexe$3;
isexe$3.sync = sync$2;
var fs$2 = require$$0__default["default"];
function checkPathExt(path2, options) {
  var pathext = options.pathExt !== void 0 ? options.pathExt : {}.PATHEXT;
  if (!pathext) {
    return true;
  }
  pathext = pathext.split(";");
  if (pathext.indexOf("") !== -1) {
    return true;
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase();
    if (p && path2.substr(-p.length).toLowerCase() === p) {
      return true;
    }
  }
  return false;
}
function checkStat$1(stat, path2, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false;
  }
  return checkPathExt(path2, options);
}
function isexe$3(path2, options, cb) {
  fs$2.stat(path2, function(er, stat) {
    cb(er, er ? false : checkStat$1(stat, path2, options));
  });
}
function sync$2(path2, options) {
  return checkStat$1(fs$2.statSync(path2), path2, options);
}
var mode = isexe$2;
isexe$2.sync = sync$1;
var fs$1 = require$$0__default["default"];
function isexe$2(path2, options, cb) {
  fs$1.stat(path2, function(er, stat) {
    cb(er, er ? false : checkStat(stat, options));
  });
}
function sync$1(path2, options) {
  return checkStat(fs$1.statSync(path2), options);
}
function checkStat(stat, options) {
  return stat.isFile() && checkMode(stat, options);
}
function checkMode(stat, options) {
  var mod = stat.mode;
  var uid = stat.uid;
  var gid = stat.gid;
  var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
  var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
  var u = parseInt("100", 8);
  var g = parseInt("010", 8);
  var o = parseInt("001", 8);
  var ug = u | g;
  var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
  return ret;
}
var core;
if (process.platform === "win32" || commonjsGlobal.TESTING_WINDOWS) {
  core = windows;
} else {
  core = mode;
}
var isexe_1 = isexe$1;
isexe$1.sync = sync;
function isexe$1(path2, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  if (!cb) {
    if (typeof Promise !== "function") {
      throw new TypeError("callback not provided");
    }
    return new Promise(function(resolve, reject) {
      isexe$1(path2, options || {}, function(er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    });
  }
  core(path2, options || {}, function(er, is) {
    if (er) {
      if (er.code === "EACCES" || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}
function sync(path2, options) {
  try {
    return core.sync(path2, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === "EACCES") {
      return false;
    } else {
      throw er;
    }
  }
}
const isWindows = process.platform === "win32" || {}.OSTYPE === "cygwin" || {}.OSTYPE === "msys";
const path$2 = path__default["default"];
const COLON = isWindows ? ";" : ":";
const isexe = isexe_1;
const getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
    ...isWindows ? [process.cwd()] : [],
    ...(opt.path || {}.PATH || "").split(colon)
  ];
  const pathExtExe = isWindows ? opt.pathExt || {}.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
  const pathExt = isWindows ? pathExtExe.split(colon) : [""];
  if (isWindows) {
    if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
      pathExt.unshift("");
  }
  return {
    pathEnv,
    pathExt,
    pathExtExe
  };
};
const which$1 = (cmd, opt, cb) => {
  if (typeof opt === "function") {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  const step = (i) => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    resolve(subStep(p, i, 0));
  });
  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1));
    const ext = pathExt[ii];
    isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext);
      }
      return resolve(subStep(p, i, ii + 1));
    });
  });
  return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
};
const whichSync = (cmd, opt) => {
  opt = opt || {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (let i = 0; i < pathEnv.length; i++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    for (let j = 0; j < pathExt.length; j++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur;
        }
      } catch (ex) {
      }
    }
  }
  if (opt.all && found.length)
    return found;
  if (opt.nothrow)
    return null;
  throw getNotFoundError(cmd);
};
var which_1 = which$1;
which$1.sync = whichSync;
var pathKey$2 = { exports: {} };
const pathKey$1 = (options = {}) => {
  const environment = options.env || process.env;
  const platform = options.platform || process.platform;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
};
pathKey$2.exports = pathKey$1;
pathKey$2.exports.default = pathKey$1;
const path$1 = path__default["default"];
const which = which_1;
const getPathKey = pathKey$2.exports;
function resolveCommandAttempt(parsed, withoutPathExt) {
  const env = parsed.options.env || process.env;
  const cwd = process.cwd();
  const hasCustomCwd = parsed.options.cwd != null;
  const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
  if (shouldSwitchCwd) {
    try {
      process.chdir(parsed.options.cwd);
    } catch (err) {
    }
  }
  let resolved;
  try {
    resolved = which.sync(parsed.command, {
      path: env[getPathKey({ env })],
      pathExt: withoutPathExt ? path$1.delimiter : void 0
    });
  } catch (e) {
  } finally {
    if (shouldSwitchCwd) {
      process.chdir(cwd);
    }
  }
  if (resolved) {
    resolved = path$1.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
  }
  return resolved;
}
function resolveCommand$1(parsed) {
  return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
var resolveCommand_1 = resolveCommand$1;
var _escape = {};
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function escapeCommand(arg) {
  arg = arg.replace(metaCharsRegExp, "^$1");
  return arg;
}
function escapeArgument(arg, doubleEscapeMetaChars) {
  arg = `${arg}`;
  arg = arg.replace(/(\\*)"/g, '$1$1\\"');
  arg = arg.replace(/(\\*)$/, "$1$1");
  arg = `"${arg}"`;
  arg = arg.replace(metaCharsRegExp, "^$1");
  if (doubleEscapeMetaChars) {
    arg = arg.replace(metaCharsRegExp, "^$1");
  }
  return arg;
}
_escape.command = escapeCommand;
_escape.argument = escapeArgument;
var shebangRegex$1 = /^#!(.*)/;
const shebangRegex = shebangRegex$1;
var shebangCommand$1 = (string = "") => {
  const match = string.match(shebangRegex);
  if (!match) {
    return null;
  }
  const [path2, argument] = match[0].replace(/#! ?/, "").split(" ");
  const binary = path2.split("/").pop();
  if (binary === "env") {
    return argument;
  }
  return argument ? `${binary} ${argument}` : binary;
};
const fs = require$$0__default["default"];
const shebangCommand = shebangCommand$1;
function readShebang$1(command) {
  const size = 150;
  const buffer = Buffer.alloc(size);
  let fd;
  try {
    fd = fs.openSync(command, "r");
    fs.readSync(fd, buffer, 0, size, 0);
    fs.closeSync(fd);
  } catch (e) {
  }
  return shebangCommand(buffer.toString());
}
var readShebang_1 = readShebang$1;
const path = path__default["default"];
const resolveCommand = resolveCommand_1;
const escape = _escape;
const readShebang = readShebang_1;
const isWin$2 = process.platform === "win32";
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function detectShebang(parsed) {
  parsed.file = resolveCommand(parsed);
  const shebang = parsed.file && readShebang(parsed.file);
  if (shebang) {
    parsed.args.unshift(parsed.file);
    parsed.command = shebang;
    return resolveCommand(parsed);
  }
  return parsed.file;
}
function parseNonShell(parsed) {
  if (!isWin$2) {
    return parsed;
  }
  const commandFile = detectShebang(parsed);
  const needsShell = !isExecutableRegExp.test(commandFile);
  if (parsed.options.forceShell || needsShell) {
    const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
    parsed.command = path.normalize(parsed.command);
    parsed.command = escape.command(parsed.command);
    parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
    const shellCommand = [parsed.command].concat(parsed.args).join(" ");
    parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
    parsed.command = {}.comspec || "cmd.exe";
    parsed.options.windowsVerbatimArguments = true;
  }
  return parsed;
}
function parse$1(command, args, options) {
  if (args && !Array.isArray(args)) {
    options = args;
    args = null;
  }
  args = args ? args.slice(0) : [];
  options = Object.assign({}, options);
  const parsed = {
    command,
    args,
    options,
    file: void 0,
    original: {
      command,
      args
    }
  };
  return options.shell ? parsed : parseNonShell(parsed);
}
var parse_1 = parse$1;
const isWin$1 = process.platform === "win32";
function notFoundError(original, syscall) {
  return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${syscall} ${original.command}`,
    path: original.command,
    spawnargs: original.args
  });
}
function hookChildProcess(cp2, parsed) {
  if (!isWin$1) {
    return;
  }
  const originalEmit = cp2.emit;
  cp2.emit = function(name, arg1) {
    if (name === "exit") {
      const err = verifyENOENT(arg1, parsed);
      if (err) {
        return originalEmit.call(cp2, "error", err);
      }
    }
    return originalEmit.apply(cp2, arguments);
  };
}
function verifyENOENT(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawn");
  }
  return null;
}
function verifyENOENTSync(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawnSync");
  }
  return null;
}
var enoent$1 = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError
};
const cp = childProcess__default["default"];
const parse = parse_1;
const enoent = enoent$1;
function spawn(command, args, options) {
  const parsed = parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}
function spawnSync(command, args, options) {
  const parsed = parse(command, args, options);
  const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}
crossSpawn$1.exports = spawn;
crossSpawn$1.exports.spawn = spawn;
crossSpawn$1.exports.sync = spawnSync;
crossSpawn$1.exports._parse = parse;
crossSpawn$1.exports._enoent = enoent;
var crossSpawn = crossSpawn$1.exports;
function stripFinalNewline(input) {
  const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
  const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
  if (input[input.length - 1] === LF) {
    input = input.slice(0, -1);
  }
  if (input[input.length - 1] === CR) {
    input = input.slice(0, -1);
  }
  return input;
}
function pathKey(options = {}) {
  const {
    env = process.env,
    platform = process.platform
  } = options;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}
function npmRunPath(options = {}) {
  const {
    cwd = process__default["default"].cwd(),
    path: path_ = process__default["default"].env[pathKey()],
    execPath = process__default["default"].execPath
  } = options;
  let previous;
  const cwdString = cwd instanceof URL ? url__default["default"].fileURLToPath(cwd) : cwd;
  let cwdPath = path__default["default"].resolve(cwdString);
  const result = [];
  while (previous !== cwdPath) {
    result.push(path__default["default"].join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = path__default["default"].resolve(cwdPath, "..");
  }
  result.push(path__default["default"].resolve(cwdString, execPath, ".."));
  return [...result, path_].join(path__default["default"].delimiter);
}
function npmRunPathEnv(_a = {}) {
  var _b = _a, { env = process__default["default"].env } = _b, options = __objRest(_b, ["env"]);
  env = __spreadValues({}, env);
  const path2 = pathKey({ env });
  options.path = env[path2];
  env[path2] = npmRunPath(options);
  return env;
}
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", __spreadProps(__spreadValues({}, toStringDescriptor), { value: newToString }));
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}
const calledFunctions = /* @__PURE__ */ new WeakMap();
const onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
const getRealtimeSignals = function() {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
const getRealtimeSignal = function(value, index) {
  return {
    name: `SIGRT${index + 1}`,
    number: SIGRTMIN + index,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
};
const SIGRTMIN = 34;
const SIGRTMAX = 64;
const SIGNALS = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];
const getSignals = function() {
  const realtimeSignals = getRealtimeSignals();
  const signals2 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals2;
};
const normalizeSignal = function({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard
}) {
  const {
    signals: { [name]: constantSignal }
  } = os.constants;
  const supported = constantSignal !== void 0;
  const number = supported ? constantSignal : defaultNumber;
  return { name, number, description, supported, action, forced, standard };
};
const getSignalsByName = function() {
  const signals2 = getSignals();
  return signals2.reduce(getSignalByName, {});
};
const getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
  return __spreadProps(__spreadValues({}, signalByNameMemo), {
    [name]: { name, number, description, supported, action, forced, standard }
  });
};
const signalsByName = getSignalsByName();
const getSignalsByNumber = function() {
  const signals2 = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals2));
  return Object.assign({}, ...signalsA);
};
const getSignalByNumber = function(number, signals2) {
  const signal = findSignalByNumber(number, signals2);
  if (signal === void 0) {
    return {};
  }
  const { name, description, supported, action, forced, standard } = signal;
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard
    }
  };
};
const findSignalByNumber = function(number, signals2) {
  const signal = signals2.find(({ name }) => os.constants.signals[name] === number);
  if (signal !== void 0) {
    return signal;
  }
  return signals2.find((signalA) => signalA.number === number);
};
getSignalsByNumber();
const getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
  if (timedOut) {
    return `timed out after ${timeout} milliseconds`;
  }
  if (isCanceled) {
    return "was canceled";
  }
  if (errorCode !== void 0) {
    return `failed with ${errorCode}`;
  }
  if (signal !== void 0) {
    return `was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== void 0) {
    return `failed with exit code ${exitCode}`;
  }
  return "failed";
};
const makeError = ({
  stdout,
  stderr,
  all,
  error,
  signal,
  exitCode,
  command,
  escapedCommand,
  timedOut,
  isCanceled,
  killed,
  parsed: { options: { timeout } }
}) => {
  exitCode = exitCode === null ? void 0 : exitCode;
  signal = signal === null ? void 0 : signal;
  const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
  const errorCode = error && error.code;
  const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
  const execaMessage = `Command ${prefix}: ${command}`;
  const isError = Object.prototype.toString.call(error) === "[object Error]";
  const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
  const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
  if (isError) {
    error.originalMessage = error.message;
    error.message = message;
  } else {
    error = new Error(message);
  }
  error.shortMessage = shortMessage;
  error.command = command;
  error.escapedCommand = escapedCommand;
  error.exitCode = exitCode;
  error.signal = signal;
  error.signalDescription = signalDescription;
  error.stdout = stdout;
  error.stderr = stderr;
  if (all !== void 0) {
    error.all = all;
  }
  if ("bufferedData" in error) {
    delete error.bufferedData;
  }
  error.failed = true;
  error.timedOut = Boolean(timedOut);
  error.isCanceled = isCanceled;
  error.killed = killed && !timedOut;
  return error;
};
const aliases = ["stdin", "stdout", "stderr"];
const hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
const normalizeStdio = (options) => {
  if (!options) {
    return;
  }
  const { stdio } = options;
  if (stdio === void 0) {
    return aliases.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
  }
  if (typeof stdio === "string") {
    return stdio;
  }
  if (!Array.isArray(stdio)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
  }
  const length = Math.max(stdio.length, aliases.length);
  return Array.from({ length }, (value, index) => stdio[index]);
};
var signalExit = { exports: {} };
var signals$1 = { exports: {} };
(function(module) {
  module.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
  ];
  if (process.platform !== "win32") {
    module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  }
  if (process.platform === "linux") {
    module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
  }
})(signals$1);
var process$1 = commonjsGlobal.process;
const processOk = function(process2) {
  return process2 && typeof process2 === "object" && typeof process2.removeListener === "function" && typeof process2.emit === "function" && typeof process2.reallyExit === "function" && typeof process2.listeners === "function" && typeof process2.kill === "function" && typeof process2.pid === "number" && typeof process2.on === "function";
};
if (!processOk(process$1)) {
  signalExit.exports = function() {
    return function() {
    };
  };
} else {
  var assert = require$$0__default$1["default"];
  var signals = signals$1.exports;
  var isWin = /^win/i.test(process$1.platform);
  var EE = require$$2__default["default"];
  if (typeof EE !== "function") {
    EE = EE.EventEmitter;
  }
  var emitter;
  if (process$1.__signal_exit_emitter__) {
    emitter = process$1.__signal_exit_emitter__;
  } else {
    emitter = process$1.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  signalExit.exports = function(cb, opts) {
    if (!processOk(commonjsGlobal.process)) {
      return function() {
      };
    }
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
    if (loaded === false) {
      load();
    }
    var ev = "exit";
    if (opts && opts.alwaysLast) {
      ev = "afterexit";
    }
    var remove = function() {
      emitter.removeListener(ev, cb);
      if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove;
  };
  var unload = function unload2() {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = false;
    signals.forEach(function(sig) {
      try {
        process$1.removeListener(sig, sigListeners[sig]);
      } catch (er) {
      }
    });
    process$1.emit = originalProcessEmit;
    process$1.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  signalExit.exports.unload = unload;
  var emit = function emit2(event, code, signal) {
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };
  var sigListeners = {};
  signals.forEach(function(sig) {
    sigListeners[sig] = function listener() {
      if (!processOk(commonjsGlobal.process)) {
        return;
      }
      var listeners = process$1.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit("exit", null, sig);
        emit("afterexit", null, sig);
        if (isWin && sig === "SIGHUP") {
          sig = "SIGINT";
        }
        process$1.kill(process$1.pid, sig);
      }
    };
  });
  signalExit.exports.signals = function() {
    return signals;
  };
  var loaded = false;
  var load = function load2() {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = true;
    emitter.count += 1;
    signals = signals.filter(function(sig) {
      try {
        process$1.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process$1.emit = processEmit;
    process$1.reallyExit = processReallyExit;
  };
  signalExit.exports.load = load;
  var originalProcessReallyExit = process$1.reallyExit;
  var processReallyExit = function processReallyExit2(code) {
    if (!processOk(commonjsGlobal.process)) {
      return;
    }
    process$1.exitCode = code || 0;
    emit("exit", process$1.exitCode, null);
    emit("afterexit", process$1.exitCode, null);
    originalProcessReallyExit.call(process$1, process$1.exitCode);
  };
  var originalProcessEmit = process$1.emit;
  var processEmit = function processEmit2(ev, arg) {
    if (ev === "exit" && processOk(commonjsGlobal.process)) {
      if (arg !== void 0) {
        process$1.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      emit("exit", process$1.exitCode, null);
      emit("afterexit", process$1.exitCode, null);
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  };
}
var onExit = signalExit.exports;
const DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
const spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
  const killResult = kill(signal);
  setKillTimeout(kill, signal, options, killResult);
  return killResult;
};
const setKillTimeout = (kill, signal, options, killResult) => {
  if (!shouldForceKill(signal, options, killResult)) {
    return;
  }
  const timeout = getForceKillAfterTimeout(options);
  const t = setTimeout(() => {
    kill("SIGKILL");
  }, timeout);
  if (t.unref) {
    t.unref();
  }
};
const shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
const isSigterm = (signal) => signal === os__default["default"].constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
const getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
  if (forceKillAfterTimeout === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
  }
  return forceKillAfterTimeout;
};
const spawnedCancel = (spawned, context) => {
  const killResult = spawned.kill();
  if (killResult) {
    context.isCanceled = true;
  }
};
const timeoutKill = (spawned, signal, reject) => {
  spawned.kill(signal);
  reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
};
const setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
  if (timeout === 0 || timeout === void 0) {
    return spawnedPromise;
  }
  let timeoutId;
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      timeoutKill(spawned, killSignal, reject);
    }, timeout);
  });
  const safeSpawnedPromise = spawnedPromise.finally(() => {
    clearTimeout(timeoutId);
  });
  return Promise.race([timeoutPromise, safeSpawnedPromise]);
};
const validateTimeout = ({ timeout }) => {
  if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
  }
};
const setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
  if (!cleanup || detached) {
    return timedPromise;
  }
  const removeExitHandler = onExit(() => {
    spawned.kill();
  });
  return timedPromise.finally(() => {
    removeExitHandler();
  });
};
function isStream(stream2) {
  return stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
}
var getStream$2 = { exports: {} };
const { PassThrough: PassThroughStream } = require$$0__default$2["default"];
var bufferStream$1 = (options) => {
  options = __spreadValues({}, options);
  const { array } = options;
  let { encoding } = options;
  const isBuffer = encoding === "buffer";
  let objectMode = false;
  if (array) {
    objectMode = !(encoding || isBuffer);
  } else {
    encoding = encoding || "utf8";
  }
  if (isBuffer) {
    encoding = null;
  }
  const stream2 = new PassThroughStream({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  let length = 0;
  const chunks = [];
  stream2.on("data", (chunk) => {
    chunks.push(chunk);
    if (objectMode) {
      length = chunks.length;
    } else {
      length += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array) {
      return chunks;
    }
    return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
  };
  stream2.getBufferedLength = () => length;
  return stream2;
};
const { constants: BufferConstants } = require$$0__default$3["default"];
const stream = require$$0__default$2["default"];
const { promisify } = require$$2__default$1["default"];
const bufferStream = bufferStream$1;
const streamPipelinePromisified = promisify(stream.pipeline);
class MaxBufferError extends Error {
  constructor() {
    super("maxBuffer exceeded");
    this.name = "MaxBufferError";
  }
}
async function getStream(inputStream, options) {
  if (!inputStream) {
    throw new Error("Expected a stream");
  }
  options = __spreadValues({
    maxBuffer: Infinity
  }, options);
  const { maxBuffer } = options;
  const stream2 = bufferStream(options);
  await new Promise((resolve, reject) => {
    const rejectPromise = (error) => {
      if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
        error.bufferedData = stream2.getBufferedValue();
      }
      reject(error);
    };
    (async () => {
      try {
        await streamPipelinePromisified(inputStream, stream2);
        resolve();
      } catch (error) {
        rejectPromise(error);
      }
    })();
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        rejectPromise(new MaxBufferError());
      }
    });
  });
  return stream2.getBufferedValue();
}
getStream$2.exports = getStream;
getStream$2.exports.buffer = (stream2, options) => getStream(stream2, __spreadProps(__spreadValues({}, options), { encoding: "buffer" }));
getStream$2.exports.array = (stream2, options) => getStream(stream2, __spreadProps(__spreadValues({}, options), { array: true }));
getStream$2.exports.MaxBufferError = MaxBufferError;
var getStream$1 = getStream$2.exports;
const { PassThrough } = require$$0__default$2["default"];
var mergeStream = function() {
  var sources = [];
  var output = new PassThrough({ objectMode: true });
  output.setMaxListeners(0);
  output.add = add;
  output.isEmpty = isEmpty;
  output.on("unpipe", remove);
  Array.prototype.slice.call(arguments).forEach(add);
  return output;
  function add(source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this;
    }
    sources.push(source);
    source.once("end", remove.bind(null, source));
    source.once("error", output.emit.bind(output, "error"));
    source.pipe(output, { end: false });
    return this;
  }
  function isEmpty() {
    return sources.length == 0;
  }
  function remove(source) {
    sources = sources.filter(function(it) {
      return it !== source;
    });
    if (!sources.length && output.readable) {
      output.end();
    }
  }
};
const handleInput = (spawned, input) => {
  if (input === void 0 || spawned.stdin === void 0) {
    return;
  }
  if (isStream(input)) {
    input.pipe(spawned.stdin);
  } else {
    spawned.stdin.end(input);
  }
};
const makeAllStream = (spawned, { all }) => {
  if (!all || !spawned.stdout && !spawned.stderr) {
    return;
  }
  const mixed = mergeStream();
  if (spawned.stdout) {
    mixed.add(spawned.stdout);
  }
  if (spawned.stderr) {
    mixed.add(spawned.stderr);
  }
  return mixed;
};
const getBufferedData = async (stream2, streamPromise) => {
  if (!stream2) {
    return;
  }
  stream2.destroy();
  try {
    return await streamPromise;
  } catch (error) {
    return error.bufferedData;
  }
};
const getStreamPromise = (stream2, { encoding, buffer, maxBuffer }) => {
  if (!stream2 || !buffer) {
    return;
  }
  if (encoding) {
    return getStream$1(stream2, { encoding, maxBuffer });
  }
  return getStream$1.buffer(stream2, { maxBuffer });
};
const getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
  const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
  const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
  const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
  try {
    return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
  } catch (error) {
    return Promise.all([
      { error, signal: error.signal, timedOut: error.timedOut },
      getBufferedData(stdout, stdoutPromise),
      getBufferedData(stderr, stderrPromise),
      getBufferedData(all, allPromise)
    ]);
  }
};
const nativePromisePrototype = (async () => {
})().constructor.prototype;
const descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);
const mergePromise = (spawned, promise) => {
  for (const [property, descriptor] of descriptors) {
    const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
    Reflect.defineProperty(spawned, property, __spreadProps(__spreadValues({}, descriptor), { value }));
  }
  return spawned;
};
const getSpawnedPromise = (spawned) => new Promise((resolve, reject) => {
  spawned.on("exit", (exitCode, signal) => {
    resolve({ exitCode, signal });
  });
  spawned.on("error", (error) => {
    reject(error);
  });
  if (spawned.stdin) {
    spawned.stdin.on("error", (error) => {
      reject(error);
    });
  }
});
const normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file];
  }
  return [file, ...args];
};
const NO_ESCAPE_REGEXP = /^[\w.-]+$/;
const DOUBLE_QUOTES_REGEXP = /"/g;
const escapeArg = (arg) => {
  if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
    return arg;
  }
  return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};
const joinCommand = (file, args) => normalizeArgs(file, args).join(" ");
const getEscapedCommand = (file, args) => normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
const DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
const getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env = extendEnv ? __spreadValues(__spreadValues({}, process__default["default"].env), envOption) : envOption;
  if (preferLocal) {
    return npmRunPathEnv({ env, cwd: localDir, execPath });
  }
  return env;
};
const handleArguments = (file, args, options = {}) => {
  const parsed = crossSpawn._parse(file, args, options);
  file = parsed.command;
  args = parsed.args;
  options = parsed.options;
  options = __spreadValues({
    maxBuffer: DEFAULT_MAX_BUFFER,
    buffer: true,
    stripFinalNewline: true,
    extendEnv: true,
    preferLocal: false,
    localDir: options.cwd || process__default["default"].cwd(),
    execPath: process__default["default"].execPath,
    encoding: "utf8",
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true
  }, options);
  options.env = getEnv(options);
  options.stdio = normalizeStdio(options);
  if (process__default["default"].platform === "win32" && path__default["default"].basename(file, ".exe") === "cmd") {
    args.unshift("/q");
  }
  return { file, args, options, parsed };
};
const handleOutput = (options, value, error) => {
  if (typeof value !== "string" && !require$$0$3.Buffer.isBuffer(value)) {
    return error === void 0 ? void 0 : "";
  }
  if (options.stripFinalNewline) {
    return stripFinalNewline(value);
  }
  return value;
};
function execa(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = childProcess__default["default"].spawn(parsed.file, parsed.args, parsed.options);
  } catch (error) {
    const dummySpawned = new childProcess__default["default"].ChildProcess();
    const errorPromise = Promise.reject(makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    }));
    return mergePromise(dummySpawned, errorPromise);
  }
  const spawnedPromise = getSpawnedPromise(spawned);
  const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
  const processDone = setExitHandler(spawned, parsed.options, timedPromise);
  const context = { isCanceled: false };
  spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
  spawned.cancel = spawnedCancel.bind(null, spawned, context);
  const handlePromise = async () => {
    const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
    const stdout = handleOutput(parsed.options, stdoutResult);
    const stderr = handleOutput(parsed.options, stderrResult);
    const all = handleOutput(parsed.options, allResult);
    if (error || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: context.isCanceled || (parsed.options.signal ? parsed.options.signal.aborted : false),
        killed: spawned.killed
      });
      if (!parsed.options.reject) {
        return returnedError;
      }
      throw returnedError;
    }
    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  const handlePromiseOnce = onetime(handlePromise);
  handleInput(spawned, parsed.options.input);
  spawned.all = makeAllStream(spawned, parsed.options);
  return mergePromise(spawned, handlePromiseOnce);
}
(async () => {
  await execa("echo", ["unicorns"]);
})();
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    webPreferences: {
      devTools: false,
      preload: path$3.join(__dirname, "../preload/index.cjs")
    },
    fullscreen: true
  });
  if (electron.app.isPackaged) {
    win.loadFile(path$3.join(__dirname, "../renderer/index.html"));
  } else {
    const url2 = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
    win.loadURL(url2);
    win.webContents.openDevTools();
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
}
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("dialog", (event, method, params) => electron.dialog[method](params));
  return createWindow();
});
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
//# sourceMappingURL=index.cjs.map
