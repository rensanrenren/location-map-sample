//./main.js

// mapLibre GL JSの読み込み
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


const map = new maplibregl.Map({
  container: 'map', //div要素のid
  zoom: 5,//初期ズーム
  center: [138, 37], //初期中心座標
  minZoom: 5, //最小ズーム
  maxZoom: 18,// 最大ズーム
  maxBounds: [[122, 20], [154, 50]], // 東京から沖縄までの範囲を指定
  style: { //スタイル設定
    "version": 8,
    "sources": {
      //背景地図ソース
      "osm": {
        "type": "raster",
        "tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        "maxzoom": 19,
        "tileSize": 256,
        "attribution": "Map data © <a href=\"https://openstreetmap.org\">OpenStreetMap</a> contributors",
      },

    //重ねるハザードマップのソースを追加
    hazard_flood: { //洪水浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19,
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",
    },

    hazard_hightide: { //高潮浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19, 
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",

    },

    hazard_tsunami: { //津波浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19,
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",
    },

    hazard_doseki: { //土石流浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19,
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",
    },

    hazard_kyukeisha: { //急傾斜浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19,
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",
    },

    hazard_jisuberi: { //地滑り浸水想定区域
      type: "raster",
      tiles: ["https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png",],
      minzoom: 2,
      maxzoom: 19,
      tileSize: 256,
      attribution: "<a href='https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright.html'>ハザードマップポータルサイト</a>",
    },
    //重ねるハザードマップのレイヤーを追加ここまで

    //指定緊急避難場所のソースを追加
    skhb: {
      type: 'vector',
      tiles: [`${location.href.replace('/index.html', '')}/skhb/{z}/{x}/{y}.pbf`],
      minzoom: 5,
      maxzoom: 8,
      attribution: '<a href="https://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="_blank">国土地理院:指定緊急避難場所データ</a>',
    },

    route: {
      //現在位置と最寄りの避難施設をつなぐライン
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    },
    
  },

    layers: [
      //背景地図レイヤー
        {
        id: 'osm-layer',
        type: 'raster',
        source: 'osm',
      },

      //重ねるハザードマップのレイヤーを追加

        {
        id: 'hazard_flood-layer',
        type: 'raster',
        source: 'hazard_flood',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に

      },

      {
        id: 'hazard_hightide-layer',
        type: 'raster',
        source: 'hazard_hightide',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に
      },
      {
        id: 'hazard_tsunami-layer',
        type: 'raster',
        source: 'hazard_tsunami',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に
      },
      {
        id: 'hazard_doseki-layer',
        type: 'raster',
        source: 'hazard_doseki',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に
      },
      {
        id: 'hazard_kyukeisha-layer',
        type: 'raster',
        source: 'hazard_kyukeisha',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に
      },
      {
        id: 'hazard_jisuberi-layer',
        type: 'raster',
        source: 'hazard_jisuberi',
        paint: {
          'raster-opacity': 0.7,
        },
        layout: {visibility: 'none'}, //初期表示を非表示に
      },
      //重ねるハザードマップのレイヤーを追加ここまで

      //指定緊急避難場所のレイヤーを追加
      {
        id: 'skhb-1-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#6666cc',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '洪水'], //属性「洪水」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      },//洪水のレイヤーを追加ここまで
      {
        //崖崩れ、土石流及び地滑りのレイヤーを追加
        id: 'skhb-2-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#ff6666',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '崖崩れ、土石流及び地滑り'], //属性「崖崩れ、土石流及び地滑り」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      },//崖崩れ、土石流及び地滑りのレイヤーを追加ここまで
      {
        //高潮のレイヤーを追加
        id: 'skhb-3-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#ffcc66',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '高潮'], //属性「高潮」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //高潮のレイヤーを追加ここまで
      {
        //地震のレイヤーを追加
        id: 'skhb-4-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#66cc66',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '地震'], //属性「地震」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //地震のレイヤーを追加ここまで
      {
        //津波のレイヤーを追加
        id: 'skhb-5-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#66cccc',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '津波'], //属性「津波」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //津波のレイヤーを追加ここまで
      {
        //大規模な火事のレイヤーを追加
        id: 'skhb-6-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#cc66cc',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '大規模な火事'], //属性「大規模な火事」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //大規模な火事のレイヤーを追加ここまで
      {
        //内水氾濫のレイヤーを追加
        id: 'skhb-7-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#cccc66',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '内水氾濫'], //属性「内水氾濫」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //内水氾濫のレイヤーを追加ここまで
      {
        //火山現象のレイヤーを追加
        id: 'skhb-8-layer',
        type: 'circle',
        source: 'skhb',
        'source-layer': 'skhb',
        paint: {
          'circle-color': '#cc6666',
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            2,
            14,
            6,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        filter: ['get', '火山現象'], //属性「火山現象」のみ表示
        layout: {visibility: 'none'}, //初期表示を非表示に
      }, //火山現象のレイヤーを追加ここまで

      {
        //現在位置と最寄り施設のライン
        id: 'route-layer',
        source: 'route',
        type: 'line',
        paint: {
          'line-color': '#33aaff',
          'line-width': 4,
        },
      },
    ],


  },//style設定ここまで
  
  },
);

// OpacityControlの読み込み
import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';

//OpacityControlの初期化
map.on('load', () => {
  //背景地図・重ねるタイル地図のコントロール
  const opacity = new OpacityControl({
    baseLayers: {
      'hazard_flood-layer': '洪水浸水想定区域', //layerID: 表示名
      'hazard_hightide-layer': '高潮浸水想定区域',
      'hazard_tsunami-layer': '津波浸水想定区域',
      'hazard_doseki-layer': '土石流浸水想定区域',
      'hazard_kyukeisha-layer': '急傾斜浸水想定区域', 
      'hazard_jisuberi-layer': '地滑り浸水想定区域',
    },
  });
  map.addControl(opacity, 'top-left'); //第二引数でコントロールの位置を指定

  //マップの初期ロード完了時に発火するイベントを定義
  map.on('click', (e) => {
    //クリック箇所に指定避難場所レイヤーがあるかどうかを判定
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        'skhb-1-layer', 
        'skhb-2-layer', 
        'skhb-3-layer', 
        'skhb-4-layer', 
        'skhb-5-layer', 
        'skhb-6-layer', 
        'skhb-7-layer', 
        'skhb-8-layer',
      ],
    });
    if (features.length === 0) return; //指定避難場所レイヤーがなければ処理を終了

    //地物があればポップアップを表示
const feature = features[0];
const popup = new maplibregl.Popup()
  .setLngLat(feature.geometry.coordinates)
  //名称・住所・対応している災害の情報を表示するようにHTMLを文字列でセット
  .setHTML(
    `\
    <div style ="font-weight:900; font-size:1rem;">${
      feature.properties['施設・場所名']
    }</div>\
    <div>住所：${feature.properties.住所}</div>\
    <div>\
    <span${
      feature.properties.洪水 ? '' : ' style="color: #ccc;"'
    }>洪水</span>\
    <span${
      feature.properties.崖崩れ ? '' : ' style="color: #ccc;"'
    }>崖崩れ</span>\
    <span${
      feature.properties.高潮 ? '' : ' style="color: #ccc;"'
    }>高潮</span>\
    <span${
      feature.properties.地震 ? '' : ' style="color: #ccc;"'
    }>地震</span>\
    <span${
      feature.properties.津波 ? '' : ' style="color: #ccc;"'
    }>津波</span>\
    <span${
      feature.properties.大規模な火事 ? '' : ' style="color: #ccc;"'
    }>大規模な火事</span>\
    <span${
      feature.properties.内水氾濫 ? '' : ' style="color: #ccc;"'
    }>内水氾濫</span>\
    <span${
      feature.properties.火山現象 ? '' : ' style="color: #ccc;"'
    }>火山現象</span>\
    </div>\
    `,
  )
  .addTo(map);
  });

  // OpacityControlで指定緊急避難場所のレイヤーのコントロール
  const OpacitySkhb = new OpacityControl({
    baseLayers: {
      'skhb-1-layer': '洪水', //layerID: 表示名
      'skhb-2-layer': '土石流及び地滑り',
      'skhb-3-layer': '高潮',
      'skhb-4-layer': '地震',
      'skhb-5-layer': '津波',
      'skhb-6-layer': '大規模な火事',
      'skhb-7-layer': '内水氾濫',
      'skhb-8-layer': '火山現象',
    },
  });
  map.addControl(OpacitySkhb, 'top-right'); //第二引数でコントロールの位置を指定

  //地図上でマウスが移動した際に発火するイベントを定義
  map.on('mousemove', (e) => {
    //マウスが重なっている地物を取得
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        'skhb-1-layer', 
        'skhb-2-layer', 
        'skhb-3-layer', 
        'skhb-4-layer', 
        'skhb-5-layer', 
        'skhb-6-layer', 
        'skhb-7-layer', 
        'skhb-8-layer',
      ],
    });
    if (features.length > 0) {
      //地物があればカーソルをポインターに変更
      map.getCanvas().style.cursor = 'pointer';
    } else {
      //地物がなければカーソルを元に戻す
      map.getCanvas().style.cursor = '';
    }
  });

  //地図画面が描画される毎フレームごとに、ユーザーの現在地に最も近い指定緊急避難場所を計算する
  map.on('render', () => {
    //GeolocationControlがオフなら現在位置を消去
    if (geolocationControl._watchState === 'OFF') userLocation = null;

    //ズームが一定値以下または現在地が計算されていない場合は計算を行わない
    if (map.getZoom() < 7 || userLocation === null) {
      map.getSource('route').setData({
        type: 'FeatureCollection',
        features: [],
      });
      return;
    }

    //現在地の最寄りの地物を取得
    const nearestFeature = getNearestFeature(userLocation[0], userLocation[1]);

    //ログを出力
    console.log("userLocation:", userLocation);
    console.log("nearestFeature coordinates:", nearestFeature._geometry.coordinates);


    //現在地と最寄りの地物を繋いだラインのGeoJSON-Featureを作成
    const routeFeature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [userLocation, nearestFeature._geometry.coordinates],
        
      },
    };
    //style.source.routeのGeoJSONデータを更新する
    map.getSource('route').setData({
      type: 'FeatureCollection',
      features: [routeFeature],
    });
  });
});

//ユーザーの現在地を保存する変数
let userLocation = null;

//MapLibre GL JSのGeolocateControl（現在位置を取得）を読み込み
const geolocationControl = new maplibregl.GeolocateControl({
  trackUserLocation: true, //位置情報の追跡を有効にする
});
map.addControl(geolocationControl, 'bottom-right'); //第二引数でコントロールの位置を指定
geolocationControl.on('geolocate', (e) => {
  //現在位置が更新するたびに発火して、userLocationを更新
  userLocation = [e.coords.longitude, e.coords.latitude];
});

//現在選択されている指定緊急避難場所レイヤー(skhb)を特定しそのfilter条件を返す関数を用意
const getCurrentSkhbLayerFilter = () => {
  const style = map.getStyle();
  const skhbLayers = style.layers.filter((layer) => 
    //'skhb'で始まるレイヤーを抽出
    layer.id.startsWith('skhb'),
  );
  const visibleSkhbLayers = skhbLayers.filter(
    //現在表示されているレイヤーをみつける
    (layer) => layer.layout.visibility === 'visible',
  );
  return visibleSkhbLayers[0].filter; //filter条件を返す
};
  
//地点間の距離を計算するモジュール
import { distance } from '@turf/turf';

const point1 = [140, 40];
const point2 = [138, 38];
const dist = distance(point1, point2);
//281.6331971379335[km]

//経緯度を渡すと最寄りの指定緊急避難場所を返す関数を用意
const getNearestFeature = (longitude, latitude) => {
  //現在表示中の指定緊急避難場所のタイルデータを取得
  const currentSkhbLayerFilter = getCurrentSkhbLayerFilter();
  const features = map.querySourceFeatures('skhb', {
    sourceLayer: 'skhb',
    filter: currentSkhbLayerFilter, //現在表示中のレイヤーのfillter条件に合致するもののみ取得
  });

  //現在地に最も近い地物を見つける
  const nearestFeature = features.reduce((minDistFeature, feature) => {
    const dist = distance(
      [longitude, latitude],
      feature.geometry.coordinates,
    );
    if (minDistFeature === null || minDistFeature.properties.dist > dist)
    //1つ目の地物、もしくは、現在地の地物が最寄りの場合は、最寄りの地物として返す
    return {
      ...feature,
      properties: {
        ...feature.properties, 
        dist,
      },
    };
    return minDistFeature; //最寄り地物を更新しない場合、そのまま返す。
  }, null);

  return nearestFeature;
  };