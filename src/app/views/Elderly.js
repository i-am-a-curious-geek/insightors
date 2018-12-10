import React, {
  Component
}                         from 'react';
import PropTypes          from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { default as AnimatedView } from 'components/AnimatedView';
import { default as Map } from 'components/Map';
import Slider from 'rc-slider';

import L from "leaflet";

import loading from 'img/loading.gif';

// Mapping State to Props
// Mapping Dispatch to Props
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../redux/actions';

const SUBZONES = ["TAMPINES EAST","BEDOK NORTH","BEDOK SOUTH","TAMPINES WEST","HONG KAH","YISHUN WEST","SERANGOON GARDEN","ALJUNIED","KEMBANGAN","HOUGANG WEST","YUNNAN","WOODLANDS EAST","CLEMENTI NORTH","BENDEMEER","BALESTIER","MARINE PARADE","LORONG AH SOO","PASIR RIS DRIVE","RIVERVALE","CHONG BOON","KAKI BUKIT","GEYLANG EAST","UPPER THOMSON","FRANKEL","JURONG WEST CENTRAL","CHENG SAN","MACPHERSON","TRAFALGAR","SENGKANG TOWN CENTRE","SIMEI","TOA PAYOH CENTRAL","YISHUN SOUTH","TOWNSVILLE","KEBUN BAHRU","BISHAN EAST","YISHUN EAST","YUHUA EAST","SERANGOON CENTRAL","YIO CHU KANG WEST","KANGKAR","WOODLANDS WEST","PUNGGOL FIELD","TAMAN JURONG","FERNVALE","MARYMOUNT","JELEBU","KOVAN","BUKIT HO SWEE","ANAK BUKIT","HOLLAND DRIVE","NORTHLAND","TECK WHYE","BUKIT BATOK CENTRAL","BOON LAY PLACE","TELOK BLANGAH DRIVE","SHANGRI-LA","ALEXANDRA HILL","TEBAN GARDENS","HONG KAH NORTH","BANGKIT","PENG SIANG","BOON TECK","YEW TEE","TELOK BLANGAH RISE","MEI CHIN","BEDOK RESERVOIR","YUHUA WEST","TOA PAYOH WEST","ANCHORVALE","WOODGROVE","CLEMENTI WOODS","PASIR RIS WEST","WOODLANDS SOUTH","TANGLIN HALT","GHIM MOH","HENDERSON HILL","TIONG BAHRU STATION","MIDVIEW","CLEMENTI WEST","FAJAR","HOUGANG EAST","CRAWFORD","CHOA CHU KANG NORTH","UPPER PAYA LEBAR","CLEMENTI CENTRAL","BOON KENG","WATERWAY EAST","GEYLANG BAHRU","MATILDA","TIONG BAHRU","TAI SENG","PASIR RIS CENTRAL","POTONG PASIR","SELETAR HILLS","SEMBAWANG CENTRAL","KAMPONG TIONG BAHRU","TELOK BLANGAH WAY","PEI CHUN","PEARL'S HILL","KAMPONG JAVA","SAUJANA","CHINATOWN","SEMBAWANG NORTH","DOVER","HILLVIEW","BRADDELL","NORTH COAST","REDHILL","KEAT HONG","BUKIT BATOK WEST","CHOA CHU KANG CENTRAL","MARGARET DRIVE","BUKIT BATOK EAST","EVERTON PARK","LAVENDER","ULU PANDAN","SERANGOON NORTH","COMMONWEALTH","LORONG 8 TOA PAYOH","SENJA","KIM KEAT","TOH GUAN","SIGLAP","GUILIN","MOUNTBATTEN","KAMPONG UBI","COMPASSVALE","FLORA DRIVE","KHATIB","KATONG","TANJONG RHU","GOMBAK","HOLLAND ROAD","HILLCREST","JOO SENG","ADMIRALTY","TAGORE","NASSIM","BUKIT BATOK SOUTH","SEMBAWANG HILLS","SUNSET WAY","LORONG CHUAN","CORONATION ROAD","LEEDON PARK","SENNETT","MOULMEIN","DEPOT ROAD","FARRER COURT","SWISS CLUB","LITTLE INDIA","BAYSHORE","CHATSWORTH","WEST COAST","DUNEARN","ANG MO KIO TOWN CENTRE","WENYA","HOUGANG CENTRAL","SPRINGLEAF","PUNGGOL TOWN CENTRE","SEMBAWANG SPRINGS","YIO CHU KANG EAST","FABER","DAIRY FARM","TYERSALL","FARRER PARK","SUNGEI ROAD","VICTORIA","PASIR PANJANG 1","CAIRNHILL","PASIR PANJANG 2","MALCOLM","LOWER SELETAR","CHINA SQUARE","NATURE RESERVE","INSTITUTION HILL","ONE TREE HILL","BENCOOLEN","LOYANG EAST","PASIR RIS PARK","LEONIE HILL","OXLEY","BUKIT MERAH","ORANGE GROVE","RIDOUT","WOODLEIGH","MARITIME SQUARE","LAKESIDE","MANDAI ESTATE","BUGIS","YISHUN CENTRAL","ROBERTSON QUAY","SEMBAWANG STRAITS","LOYANG WEST","XILIN","CHANGI POINT","KENT RIDGE","KAMPONG BUGIS","MONK'S HILL","TURF CLUB","NEE SOON","MOUNT EMILY","GOODWOOD PARK","MOUNT PLEASANT","SEMBAWANG EAST","SENTOSA","TANJONG PAGAR","ALEXANDRA NORTH","BOULEVARD","TANGLIN","CHANGI WEST","PEOPLE'S PARK","KAMPONG GLAM","WESTERN WATER CATCHMENT","SELEGIE","BOAT QUAY","QUEENSWAY","NORTHSHORE","CENTRAL SUBZONE","ONE NORTH","NEWTON CIRCUS","PORT","PATERSON","LIM CHU KANG","CLARKE QUAY","CECIL","FORT CANNING","SOMERSET","DHOBY GHAUT","PHILLIP","RAFFLES PLACE","BAYFRONT SUBZONE","CLIFFORD PIER","MARINA SOUTH","SEMAKAU","SOUTHERN GROUP","CITY TERMINALS","ANSON","STRAITS VIEW","SINGAPORE GENERAL HOSPITAL","MAXWELL","MARINA EAST","JURONG ISLAND AND BUKOM","SUDONG","EAST COAST","NATIONAL UNIVERSITY OF S'PORE","ROCHOR CANAL","PIONEER SECTOR","PENJURU CRESCENT","JOO KOON","KALLANG WAY","INTERNATIONAL BUSINESS PARK","TUKANG","MACKENZIE","ISTANA NEGARA","GUL BASIN","TUAS VIEW EXTENSION","MARINA EAST (MP)","MARINA CENTRE","CITY HALL","TUAS BAY","JURONG PORT","SAMULUN","SHIPYARD","PANDAN","SINGAPORE POLYTECHNIC","KALLANG BAHRU","TUAS VIEW","BENOI SECTOR","GUL CIRCLE","LIU FANG","BRAS BASAH","JURONG RIVER","CHIN BEE","BIDADARI","DEFU INDUSTRIAL PARK","TENGEH","TUAS PROMENADE","AIRPORT ROAD","BRICKWORKS","JURONG GATEWAY","SAFTI","TOH TUCK","YIO CHU KANG","CHANGI BAY","PAYA LEBAR EAST","TAMPINES NORTH","SERANGOON NORTH IND ESTATE","TENGAH","PLAB","PAYA LEBAR NORTH","LORONG HALUS","PAYA LEBAR WEST","LORONG HALUS NORTH","TUAS NORTH","KIAN TECK","GALI BATU","PULAU SELETAR","SIMPANG NORTH","SENOKO SOUTH","TANJONG IRAU","PANG SUA","SELETAR AEROSPACE PARK","MANDAI WEST","CONEY ISLAND","THE WHARVES","PULAU PUNGGOL TIMOR","PULAU PUNGGOL BARAT","WOODLANDS REGIONAL CENTRE","NORTH-EASTERN ISLANDS","MANDAI EAST","SIMPANG SOUTH","KRANJI","RESERVOIR VIEW","GREENWOOD PARK","SENOKO WEST","CHANGI AIRPORT","YIO CHU KANG NORTH","PUNGGOL CANAL","CENTRAL WATER CATCHMENT","SELETAR","SENOKO NORTH","SENGKANG WEST","PASIR RIS WAFER FAB PARK"];

const PLANNING_AREAS = ["BEDOK","ANG MO KIO","HOUGANG","BUKIT MERAH","TAMPINES","JURONG WEST","TOA PAYOH","YISHUN","WOODLANDS","SERANGOON","KALLANG","GEYLANG","QUEENSTOWN","SENGKANG","CLEMENTI","BUKIT BATOK","CHOA CHU KANG","BUKIT PANJANG","BISHAN","PASIR RIS","JURONG EAST","BUKIT TIMAH","PUNGGOL","MARINE PARADE","NOVENA","SEMBAWANG","OUTRAM","ROCHOR","TANGLIN","RIVER VALLEY","NEWTON","DOWNTOWN CORE","SINGAPORE RIVER","CHANGI","MANDAI","SUNGEI KADUT","ORCHARD","SOUTHERN ISLANDS","WESTERN WATER CATCHMENT","MUSEUM","LIM CHU KANG","SELETAR","NORTH-EASTERN ISLANDS","PIONEER","BOON LAY","MARINA SOUTH","STRAITS VIEW","SIMPANG","TUAS","WESTERN ISLANDS","CENTRAL WATER CATCHMENT","TENGAH","MARINA EAST","CHANGI BAY","PAYA LEBAR"];

const SUBZONE_DATA = [16400,14510,9170,8860,7680,7400,7080,6930,6800,6630,6540,6160,6140,6120,5680,5660,5650,5650,5550,5540,5490,5470,5440,5240,5240,5130,5060,5050,5000,4830,4810,4800,4660,4610,4590,4390,4320,4250,4060,4000,3920,3890,3820,3740,3720,3720,3630,3440,3420,3380,3350,3320,3310,3300,3290,3240,3180,3170,3120,3110,3110,3110,3090,3020,2990,2970,2950,2930,2910,2880,2810,2780,2770,2750,2740,2710,2690,2670,2650,2610,2600,2570,2530,2510,2470,2470,2460,2430,2400,2390,2340,2330,2320,2290,2290,2240,2210,2200,2160,2120,2050,2040,2010,2000,2000,1970,1960,1950,1920,1910,1910,1870,1850,1820,1810,1790,1790,1760,1760,1750,1660,1650,1550,1550,1520,1490,1470,1460,1440,1430,1370,1330,1320,1310,1250,1230,1210,1190,1190,1180,1150,1130,1050,1000,990,920,910,860,830,820,780,760,720,720,720,680,660,650,650,650,640,590,590,550,530,520,520,500,500,470,450,440,430,410,380,320,300,290,290,280,270,260,260,230,230,220,220,220,210,200,190,190,180,170,170,150,140,140,140,120,110,110,110,100,90,80,80,80,70,70,60,60,60,50,40,40,40,30,30,30,20,20,20,10,10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const PLANNING_AREA_DATA = [46510,30970,30500,30410,30250,27230,23250,22760,20380,19040,19010,18990,18680,18640,16540,16260,15880,14220,13760,12980,12330,11540,9430,8630,7880,6480,4690,2900,2710,1250,1060,360,240,230,220,160,150,90,60,40,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0];

class Elderly extends React.Component { 
  constructor() {
    super();

    this.featureGroupLayer = new L.featureGroup(); 
    this.featureGroupMarkers = new L.featureGroup();  
    this.featureGroupMarkers_2 = new L.featureGroup();    
  }

  static propTypes = {            
    elderlySubzoneDataIsFetching:  PropTypes.bool,
    elderlyAreaDataIsFetching: PropTypes.bool,
    eldercareServicesDataIsFetching:  PropTypes.bool,
    chasClinicsDataIsFetching:  PropTypes.bool,

    actions: PropTypes.shape({
      enterElderly: PropTypes.func,
      leaveElderly: PropTypes.func,  
     
      fetchElderlySubzoneDataIfNeeded:     PropTypes.func,
      fetchElderlyAreaDataIfNeeded:        PropTypes.func,
      fetchEldercareServicesDataIfNeeded:  PropTypes.func,
      fetchChasClinicsDataIfNeeded:  PropTypes.func
    })
  };

  state = {
    opacity: 70,
    agg: "PLANNING AREAS",   
    eldercareServices: false,
    chasClinics: false,
    showFilters: true,
    view: true
  };

  componentWillMount() {     
    const { actions: { enterElderly } } = this.props;           
    enterElderly();    

    const { actions: { fetchElderlyAreaDataIfNeeded } } = this.props;
    fetchElderlyAreaDataIfNeeded();    
  }
  
  componentDidMount() {}

  componentWillUnmount() {
    const { actions: { leaveElderly } } = this.props;
    leaveElderly();    
  }
 
  render() {   
    const {           
      elderlyAreaData,
      elderlyAreaDataIsFetching,
      elderlySubzoneData,
      elderlySubzoneDataIsFetching,
      eldercareServicesData,
      eldercareServicesDataIsFetching,
      chasClinicsData,
      chasClinicsDataIsFetching    
    } = this.props;
                        
    if(elderlyAreaDataIsFetching || elderlySubzoneDataIsFetching || eldercareServicesDataIsFetching || chasClinicsDataIsFetching) {  
      this.featureGroupMarkers.eachLayer((layer) => {
        this.featureGroupMarkers.removeLayer(layer);
      });

      this.featureGroupMarkers_2.eachLayer((layer) => {
        this.featureGroupMarkers_2.removeLayer(layer);
      });

      this.featureGroupLayer.eachLayer((layer) => {
        this.featureGroupLayer.removeLayer(layer);
      });
      return (<AnimatedView>
          <div className="row">                          
            <Col xs={12} md={12}>                    
              <div style={{width: "100%", height: 350 }}>                  
                <div className="row">
                   <div style={{width: "100%", margin: "20px auto", textAlign: "center"}}>
                      <h3 className="page-title">Loading</h3>
                      <img src={loading} style={{height: 50, width: 50}} alt="Loading..." /> 
                    </div>
                </div> 
              </div>                                       
            </Col>                                                                
          </div>
      </AnimatedView>);    
    } else {           
      return(    
        <AnimatedView> 
          <div className="row map-container-card">                        
            <button 
              className="btn btn-default pull-right view-switcher"
              onClick={this.handleClickView}
            >
              { (this.state.view) ? "View Chart" : "View Map" }
            </button>   

            <Map
              symbol="old"
              title="Elderly (≥ age 65) in Singapore (Year 2017)"             
              breaks={(this.state.agg === "SUBZONE") ? [0,920,2470,4390,9170,16400] : [0,4690,14220,23250,30970,46510]}
              colors={["#ffffff", "#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"]}              
              attribute={"ABOVE_65"}

              view={this.state.view}
              graphColor="rgba(255, 159, 64, 0.2)"
              borderColor="rgb(255, 205, 86)"
              graphData={ (this.state.agg === "SUBZONE") ? SUBZONE_DATA : PLANNING_AREA_DATA}
              graphLabels={ (this.state.agg === "SUBZONE") ? SUBZONES : PLANNING_AREAS}


              geojsonLayer={(this.state.agg === "SUBZONE") ? elderlySubzoneData : elderlyAreaData}  
              tooltipCaption={(this.state.agg === "SUBZONE") ? "Subzone" : "Planning Area"}
              tooltipAttribute={ (this.state.agg === "SUBZONE") ? "SUBZONE_N" : "PLN_AREA_N"}

              geojsonMarkerCaption="ELDERCARE SERVICES" 
              geojsonMarkers={ (this.state.eldercareServices) ? eldercareServicesData : undefined } 
              geojsonMarkerColor="#ff4500"

              geojsonMarkerCaption_2="CHAS CLINICS"
              geojsonMarkers_2={ (this.state.chasClinics) ? chasClinicsData : undefined }       
              geojsonMarkerColor_2="#4ce1b6"
              
              opacity={this.state.opacity}
              featureGroupLayer={this.featureGroupLayer}     
              featureGroupMarkers={this.featureGroupMarkers}  
              featureGroupMarkers_2={this.featureGroupMarkers_2}                
            />
          </div>
          <div id="filter-box" className={ (this.state.view) ? "" : "hidden" }>
              <Card>
                <CardBody>
                  <table className="filter-table-header">
                    <thead>                    
                      <tr>
                        <th>
                          <svg className="icon icon-filter">
                            <use xlinkHref="#icon-filter"></use>
                          </svg> FILTERS
                        </th> 
                        <th>
                          <button 
                            className="btn btn-default collapse-btn"                             
                            onClick={this.handleShowFilters}
                          >
                            <svg className={ (this.state.showFilters) ? "icon icon-minus" : "icon icon-plus" }>
                              <use xlinkHref={ (this.state.showFilters) ? "#icon-minus" : "#icon-plus" }></use>
                            </svg>
                          </button>
                        </th>                 
                      </tr>
                    </thead>
                    <tbody style={ (this.state.showFilters) ? { display: "table-row-group"} : { display: "none"} }>
                      <tr><td colSpan={2}><br /></td></tr>
                      <tr><th colSpan={2}>LAYER OPACITY</th></tr>
                      <tr>                        
                        <td colSpan={2}>
                          <Slider
                            min={0}
                            max={100}                                          
                            step={1}
                            value={this.state.opacity}
                            onChange={this.setLayerOpacity}                          
                          />
                        </td>
                      </tr>
                      <tr><td colSpan={2}><br /></td></tr>
                      <tr>
                        <th>AGGREGATION</th>
                        <td>
                          <select 
                            className="form__form-group-select select-control"
                            onChange={this.handleAggregationChange}
                            value={this.state.agg}
                          >
                            <option>PLANNING AREAS</option>
                            <option>SUBZONE</option>
                          </select>
                        </td>
                      </tr>  
                      <tr><td colSpan={2}><br /></td></tr>
                      <tr>
                        <th>ELDERCARE SERVICES</th>
                        <td>                        
                          <label className="toggle-switch">
                            <input type="checkbox"  
                              onChange={this.handleChangeEldercareServices}
                              checked={this.state.eldercareServices}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
                        </td>
                      </tr> 
                      <tr>
                        <th>CHAS CLINICS</th>
                        <td>                        
                          <label className="toggle-switch">
                            <input type="checkbox"  
                              onChange={this.handleChangeChasClinics}
                              checked={this.state.chasClinics}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <small>*CHAS = Community Health Assist Scheme</small>
                        </td>
                      </tr>                                                      
                    </tbody>                   
                  </table>                              
                </CardBody>                
             </Card>
          </div> 
        </AnimatedView>               
      );         
    }        
  }

  setLayerOpacity = (value) => {
    this.setState({
      opacity: value
    });

    this.featureGroupLayer.eachLayer((layer) => {      
      layer.setStyle({
        fillOpacity: parseFloat(value/100),
        opacity: parseFloat(value/100)
      });
    });    
  }

  handleClickView = (event) => {
    event.preventDefault();
    this.setState({
      view: !this.state.view
    });
  }

  handleAggregationChange = (event) => {
    event.preventDefault();
    let agg = event.target.value;

    if(agg === "SUBZONE") {
      const { actions: {       
        fetchElderlySubzoneDataIfNeeded
      } } = this.props;

      fetchElderlySubzoneDataIfNeeded();    
    } else if(agg === "PLANNING AREAS") {
      const { actions: {       
        fetchElderlyAreaDataIfNeeded
      } } = this.props;

      fetchElderlyAreaDataIfNeeded();    
    }

    this.setState({
        agg: agg
    });
  }

  handleChangeEldercareServices = (event) => {
    if(event.target.checked) {
      const { actions: {       
        fetchEldercareServicesDataIfNeeded
      } } = this.props;

      fetchEldercareServicesDataIfNeeded();  
    } else {
      this.featureGroupMarkers.eachLayer((layer) => {
        this.featureGroupMarkers.removeLayer(layer);
      });
    }    

    this.setState({        
      eldercareServices: event.target.checked
    });
  }


  handleChangeChasClinics = (event) => {
    if(event.target.checked) {
      const { actions: {       
        fetchChasClinicsDataIfNeeded
      } } = this.props;

      fetchChasClinicsDataIfNeeded();  
    } else {
      this.featureGroupMarkers_2.eachLayer((layer) => {
        this.featureGroupMarkers_2.removeLayer(layer);
      });
    }    

    this.setState({        
      chasClinics: event.target.checked
    });
  }



  handleShowFilters = (event) => {
    this.setState({
      showFilters: !this.state.showFilters
    });
  }

}


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    
    elderlySubzoneDataIsFetching:  state.elderlySubzoneData.isFetching,    
    elderlySubzoneData: state.elderlySubzoneData.data,

    elderlyAreaDataIsFetching:  state.elderlyAreaData.isFetching,    
    elderlyAreaData: state.elderlyAreaData.data,

    eldercareServicesDataIsFetching: state.eldercareServicesData.isFetching,
    eldercareServicesData: state.eldercareServicesData.data,

    chasClinicsDataIsFetching: state.chasClinicsData.isFetching,
    chasClinicsData: state.chasClinicsData.data
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterElderly: actions.enterElderly,
        leaveElderly: actions.leaveElderly,
        
        fetchElderlyAreaDataIfNeeded: actions.fetchElderlyAreaDataIfNeeded,
        fetchElderlySubzoneDataIfNeeded: actions.fetchElderlySubzoneDataIfNeeded,        
        fetchEldercareServicesDataIfNeeded: actions.fetchEldercareServicesDataIfNeeded,
        fetchChasClinicsDataIfNeeded: actions.fetchChasClinicsDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elderly);