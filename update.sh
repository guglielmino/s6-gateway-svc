#!/usr/bin/env bash

##############
GITLAB_JOBNAME="build"
DEST_RELEASE_PATH="/opt/s6-gateway-app"
RELEASE_PACKAGE_NAME="release.tar.gz"
###########

[ -z "$SUB_KEY" ] && tee >(logger -p local0.err) <<< "SUB_KEY variable not found. Must be set with PubNub subscribe key for 'update' channel" && exit 1;
[ -z "$GITLAB_PRIVATE_TOKEN" ] && tee >(logger -p local0.err) <<< "GITLAB_PRIVATE_TOKEN variable not found. Must be set with GitLab artifact access token" && exit 1;
[ -z "$GITLAB_GROUP" ] && tee >(logger -p local0.err) <<< "GITLAB_GROUP variable not found. Must be set with GitLab group name the project belongs to" && exit 1;
[ -z "$GITLAB_PROJECT" ] && tee >(logger -p local0.err) <<< "GITLAB_PROJECT variable not found. Must be set with GitLab project name" && exit 1;
[ -z "$GITLAB_JOBNAME" ] && tee >(logger -p local0.err) <<< "GITLAB_JOBNAME variable not found. Must be set with GitLab job name used by the pipeline to build the release" && exit 1;


download_and_deploy() {
  curl --silent -XGET -L --header "PRIVATE-TOKEN: $GITLAB_PRIVATE_TOKEN" "https://gitlab.com/$GITLAB_GROUP/$GITLAB_PROJECT/builds/artifacts/master/download?job=$GITLAB_JOBNAME" -o release.zip
  if [ $? -eq 0 ]; then
    tee >(logger -p local0.info) <<< "Downloaded $APP_VERSION"
    [ -d $DEST_RELEASE_PATH ] || mkdir $DEST_RELEASE_PATH
    unzip  -o -d $DEST_RELEASE_PATH release.zip
    cd $DEST_RELEASE_PATH
    tar -xzf $RELEASE_PACKAGE_NAME
    rm $RELEASE_PACKAGE_NAME
    npm install
    cd -
  fi
}

provisioning_pm2() {
  npm install -gy pm2
  cd  $DEST_RELEASE_PATH
  pm2 start pm2.config.json
  cd -
}

provisioning_autoupdate() {
  cd $DEST_RELEASE_PATH
  cp s6-update-init /etc/init.d/
  chmod +x /etc/init.d/s6-update-init
  update-rc.d s6-update-init defaults 100
}


while [ "$1" != "" ]; do
    case $1 in
        -p | --ing )            shift
                                prov=1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

if [ "$prov" = "1" ]; then
  tee >(logger -p local0.info) <<< "Provisioning SmartSix Gateway Application"
  download_and_deploy
  provisioning_pm2
  provisioning_autoupdate
  exit 0
fi


while [ true ]
do
  PAYLOAD=`curl --silent -m 1 http://p.pubnub.com/stream/$SUB_KEY/update/0/-1`
  if [ -n "$PAYLOAD" ]; then
    APP_VERSION=`node -e "console.log(JSON.parse('$PAYLOAD')[0][0].AppVersion)"`
    tee >(logger -p local0.info) <<< "Downloading version $APP_VERSION"

    download_and_deploy
  fi
done