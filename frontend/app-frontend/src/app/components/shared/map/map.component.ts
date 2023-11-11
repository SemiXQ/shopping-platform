import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TitleLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import { DragZoom, defaults as defaultInteracts } from 'ol/interaction.js';
import Feature from 'ol/Feature.js';
import Icon from 'ol/style/Icon.js';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import { Store } from 'src/app/data/models/store';
import { StoresService } from 'src/app/services/stores.service';
import Overlay from 'ol/Overlay';
import BaseEvent from 'ol/events/Event';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapTooltip') mapTooltip!: ElementRef<HTMLElement>;
  stores!: Store[];
  current_store: Store | undefined;
  private static readonly _bby_coordinate: Array<number> = [-122.95864, 49.23979];
  map!: Map;
  //readonly stores: Array<Array<number>> = [[-122.89453, 49.25305]];
  private readonly _logoImg: HTMLImageElement = new Image();
  private static readonly _logoStyle: Style = new Style({
    image: new Icon({
      scale: 0.03,
      src: 'assets/icons/Pngtree-location marker_5990782.png'
    })
  });

  constructor(storeService: StoresService) {
    storeService.getAllStores().subscribe((storesData: Store[]) => {
      this.stores = storesData;
    });
  }

  ngOnInit(): void {
    this.map = new Map({
      interactions: defaultInteracts().extend([new DragZoom()]),
      layers: [
        new TitleLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat(MapComponent._bby_coordinate),
        zoom: 10,
        maxZoom: 18,
        minZoom: 8
      }),
    });

    const featureArr: Array<Feature> = new Array<Feature>();

    this.stores.forEach((store: Store, idx: number) => {
      const markerFeature: Feature = new Feature({
        geometry: new Point(fromLonLat(store.lonLatLoc)),
        style: MapComponent._logoStyle,
        name: 'Store_' + idx,
        store_id: store.id
      });
      markerFeature.setStyle(MapComponent._logoStyle);
      featureArr.push(markerFeature);
    });

    const markerLayer = new VectorLayer({
      className: 'store-markers',
      source: new VectorSource({
        features: featureArr
      })
    });

    this.map.addLayer(markerLayer);
  }

  ngAfterViewInit(): void {
      const toolLayer = new Overlay({
        element: this.mapTooltip.nativeElement,
        positioning: 'bottom-left',
        stopEvent: false
      });
      this.map.addOverlay(toolLayer);

      this.map.on('click', (evt) => {
        this._closeTooltip();
        const storeId: string = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          return feature.get('store_id');
        })
        toolLayer.setPosition(evt.coordinate);
        this._openTooltip(storeId);
      });

      // this.map.on('pointermove', (evt) => {
      //   const hasFeature = this.map.hasFeatureAtPixel(this.map.getEventPixel(evt.originalEvent));
      //   //TODO: change cursor style dynamically
      // });
  }

  private _closeTooltip() {
    this.current_store = undefined;
  }

  private _openTooltip(storeId: string) {
    this.current_store = this.stores.find((store: Store) => store.id === storeId, undefined);
    return; 
  }
}
