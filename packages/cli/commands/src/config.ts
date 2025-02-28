/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
/**
 * 设置cnpmrc
 * 类似于 $ npm config set registry https://registry.npmmirror.com/
 */
import * as path from 'path';
import os from 'os';
import { logs, npm, cliConfig } from '@opentiny/cli-devkit';

const log = logs('core-commands');

export default async (argv) => {
  // set 方法
  if (argv && argv.length === 3 && argv[0] === 'set') {
    const obj = {};
    const key = argv[1];
    const value = argv[2];
    obj[key] = value;
    npm.setCnpmrc(obj);
    log.success(`已将 ${key}=${value} 写入到.cnpmrc文件中!`);
  } else if (argv && argv.length === 2 && argv[0] === 'get') {
    const config = npm.getCnpmrc();
    const value = argv[1];
    if (config[value]) {
      log.success(config[value]);
    } else {
      log.error(`${value} 不在.cnpmrc文件中`);
    }
  } else if (argv && argv.length === 2 && argv[0] === 'delete') {
    const config = npm.getCnpmrc();
    const value = argv[1];
    delete config[value];
    npm.setCnpmrc(config);
    log.error(`${value} 从.cnpmrc文件中删除!`);
  } else if (argv && argv[0] === 'list') {
    const config = npm.getCnpmrc();
    const root = os.homedir();
    log.success(path.join(root, '.cnpmrc'));
    console.log(config);
  } else {
    const bin = cliConfig.getBinName();
    log.warn(`config 参数不正确，用法举例：

# 设置.cnpmrc 文件，写入registry
${bin} config set registry https://registry.npmmirror.com/

# 获取.cnpmrc 文件中registry的值
${bin} config get registry

# 列出所有.cnpmrc文件配置
${bin} config list

# 删除.cnpmrc文件中registry的配置
${bin} config delete
`);
  }
};
