/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  WebView,
  View
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const dirs = RNFetchBlob.fs.dirs
console.log(dirs.DocumentDir)
console.log(dirs.CacheDir)
console.log(dirs.DCIMDir)
console.log(dirs.DownloadDir)

let src='index.html'
let assetSrc = RNFetchBlob.fs.asset(src)
let assetDest = dirs.DocumentDir+'/'+src
//NFetchBlob.fs.mkdir(dirs.DocumentDir+'/img')

let htmlStr='before the read file is done'
let waitHtml
new Promise((resolve)=>{waitHtml = resolve})
async function cpAsset(){
  try{
    let exist = await RNFetchBlob.fs.exists(assetSrc)
    console.log(`file ${exist ? '' : 'not'} exists`)
    //await RNFetchBlob.fs.cp(assetSrc, assetDest)
    await RNFetchBlob.fs.cp(RNFetchBlob.fs.asset('img/photo.jpg'), 
      dirs.DocumentDir+'/img/photo.jpg')
    console.log("RNFetchBlob.fs.cp ok")
    let files = await  RNFetchBlob.fs.ls(RNFetchBlob.fs.asset('img/*'))
    console.log(files)
  }
  catch(e) { 
    console.log('exception '+e)
  }
  finally{
    printDir(dirs.MainBundleDir)
  }  
}
//cpAsset()

function printDir(path){
  RNFetchBlob.fs.lstat(path)
  .then((files) => {
    console.log(files)
    files.forEach((file, idx)=>{
      if (file.type=='directory')
        printDir(file.path)
    })
  })
  .catch(() => { 
    console.log(path+` fRNFetchBlob.fs.lstat exception`)
  })

}



type Props = {};
export default class App extends Component<Props> {
   render() {

    return (
        <WebView
          source={require('./webSrcRedux/index.html')}
          scrollEnabled={false}
        ></WebView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
