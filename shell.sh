#!/bin/sh

#自动化发布脚本
#使用方法
#skymall
#admin
#

GIT_HOME=/developer/git-repository/
DEST_PATH=/product/frontend/

# cd dir 进入开发环境目录
if [ ! -n "$1" ];
  then
  echo -e "=====请输入要发布的项目！====="
  exit
fi

if [ $1="SkyMall" ];
  then
  echo -e "==========Enter skymall========="
  cd $GIT_HOME$1

elif [ $1="admin" ];
  then
  echo -e "==========Enter admin========="
  cd $GIT_HOME$1

else
  echo -e "输入的项目名没有找到"
  exit
fi

#clear git dist 编译前先删除原有的dist文件
echo -e "==========clear git dist========="
rm -rf ./dist

#git操作 拉取最新代码
echo -e "==========git checkout master========="
git checkout master

echo -e "===========git pull=========="
git pull

#npm i  安装依赖
echo -e "===========npm install=========="
npm install --registry=https://registry.npm.taobao.org

#npm run dist 打包
echo -e "==========npm run dist========="
npm run dist


if [ -d "./dist" ];
  then
  echo -e "==========dest backup========="
  #备份product里原有的dist
  mv $DEST_PATH$1/dist $DEST_PATH/dist.bak

  #copy 
  echo -e "=============copy============="
  #把新生产的dist复制过去
  cp -R ./dist $DEST_PATH$1

  #echo result
  echo -e "=========Deploy Success========"
else
  echo -e "=========Deploy Error========"
fi