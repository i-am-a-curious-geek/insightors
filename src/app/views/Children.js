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

const PLANNING_AREAS = ["SENGKANG","PUNGGOL","JURONG WEST","WOODLANDS","YISHUN","TAMPINES","BEDOK","HOUGANG","CHOA CHU KANG","BUKIT PANJANG","BUKIT MERAH","ANG MO KIO","PASIR RIS","BUKIT BATOK","TOA PAYOH","QUEENSTOWN","SEMBAWANG","GEYLANG","KALLANG","CLEMENTI","SERANGOON","BISHAN","BUKIT TIMAH","JURONG EAST","NOVENA","MARINE PARADE","TANGLIN","OUTRAM","RIVER VALLEY","ROCHOR","NEWTON","SINGAPORE RIVER","CHANGI","DOWNTOWN CORE","SOUTHERN ISLANDS","MANDAI","WESTERN WATER CATCHMENT","ORCHARD","SUNGEI KADUT","MUSEUM","SELETAR","NORTH-EASTERN ISLANDS","PIONEER","BOON LAY","LIM CHU KANG","MARINA SOUTH","STRAITS VIEW","SIMPANG","TUAS","WESTERN ISLANDS","CENTRAL WATER CATCHMENT","TENGAH","MARINA EAST","CHANGI BAY","PAYA LEBAR"];

const PLANNING_AREAS_DATA = [17660,15970,12260,11670,11560,11230,10980,8640,8610,7620,6720,5930,5850,5090,4610,4570,4310,4280,4110,3990,3830,3250,3220,3190,2140,2130,1080,1000,500,470,350,230,150,110,110,90,40,40,30,20,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const SUBZONES = ["TAMPINES EAST","MATILDA","FERNVALE","WATERWAY EAST","YISHUN EAST","WOODLANDS EAST","TAMPINES WEST","SENGKANG TOWN CENTRE","JURONG WEST CENTRAL","ANCHORVALE","RIVERVALE","PUNGGOL FIELD","BEDOK NORTH","YUNNAN","KEAT HONG","WOODLANDS SOUTH","PUNGGOL TOWN CENTRE","COMPASSVALE","YISHUN WEST","HONG KAH","TAMAN JURONG","FAJAR","MIDVIEW","SAUJANA","PASIR RIS DRIVE","YEW TEE","BOON LAY PLACE","SIMEI","BEDOK SOUTH","PENG SIANG","TRAFALGAR","SENJA","BENDEMEER","PASIR RIS CENTRAL","FRANKEL","KANGKAR","TOA PAYOH CENTRAL","KEMBANGAN","SEMBAWANG NORTH","SEMBAWANG CENTRAL","HOUGANG EAST","CLEMENTI NORTH","MARGARET DRIVE","ALJUNIED","HOUGANG WEST","GEYLANG EAST","YISHUN SOUTH","KAKI BUKIT","BALESTIER","PASIR RIS WEST","LOWER SELETAR","WOODLANDS WEST","MARYMOUNT","BEDOK RESERVOIR","WOODGROVE","MARINE PARADE","MACPHERSON","CHENG SAN","NORTHLAND","SERANGOON GARDEN","CHOA CHU KANG NORTH","JELEBU","LORONG AH SOO","TEBAN GARDENS","UPPER THOMSON","BISHAN EAST","KOVAN","TOWNSVILLE","ADMIRALTY","HONG KAH NORTH","BUKIT BATOK CENTRAL","YIO CHU KANG WEST","CLEMENTI WOODS","TECK WHYE","CHONG BOON","YUHUA EAST","TIONG BAHRU STATION","TIONG BAHRU","TELOK BLANGAH DRIVE","SERANGOON CENTRAL","CHOA CHU KANG CENTRAL","ANAK BUKIT","YUHUA WEST","BANGKIT","CHINATOWN","KEBUN BAHRU","BUKIT HO SWEE","BUKIT BATOK WEST","HILLVIEW","REDHILL","FLORA DRIVE","CLEMENTI WEST","WENYA","TOH GUAN","MOULMEIN","UPPER PAYA LEBAR","SHANGRI-LA","SERANGOON NORTH","BUKIT BATOK SOUTH","MEI CHIN","TANGLIN HALT","GUILIN","TANJONG RHU","GHIM MOH","BOON KENG","SELETAR HILLS","ALEXANDRA HILL","MOUNTBATTEN","BOON TECK","NASSIM","CLEMENTI CENTRAL","GOMBAK","DOVER","HOLLAND ROAD","HOLLAND DRIVE","TAI SENG","KAMPONG UBI","NORTH COAST","PASIR RIS PARK","HENDERSON HILL","KATONG","TELOK BLANGAH RISE","ULU PANDAN","HILLCREST","POTONG PASIR","BUKIT BATOK EAST","BRADDELL","KAMPONG JAVA","BAYSHORE","TELOK BLANGAH WAY","TOA PAYOH WEST","GEYLANG BAHRU","LAVENDER","EVERTON PARK","FARRER COURT","CHATSWORTH","PEI CHUN","DEPOT ROAD","KHATIB","LORONG CHUAN","WEST COAST","KAMPONG TIONG BAHRU","LEEDON PARK","JOO SENG","CORONATION ROAD","CRAWFORD","TAGORE","DAIRY FARM","COMMONWEALTH","PEARL'S HILL","INSTITUTION HILL","KIM KEAT","SWISS CLUB","ROBERTSON QUAY","LORONG 8 TOA PAYOH","SUNSET WAY","PASIR PANJANG 1","ANG MO KIO TOWN CENTRE","SEMBAWANG HILLS","SEMBAWANG SPRINGS","MARITIME SQUARE","SENNETT","CAIRNHILL","SIGLAP","FABER","NATURE RESERVE","TYERSALL","YIO CHU KANG EAST","SEMBAWANG EAST","SPRINGLEAF","DUNEARN","CHANGI WEST","HOUGANG CENTRAL","PASIR PANJANG 2","LEONIE HILL","WOODLEIGH","SENTOSA","MALCOLM","LITTLE INDIA","SUNGEI ROAD","MANDAI ESTATE","FARRER PARK","ALEXANDRA NORTH","ONE TREE HILL","SEMBAWANG STRAITS","RIDOUT","MOUNT EMILY","ORANGE GROVE","LOYANG EAST","GOODWOOD PARK","OXLEY","BENCOOLEN","VICTORIA","YISHUN CENTRAL","BUKIT MERAH","CHINA SQUARE","NEE SOON","WESTERN WATER CATCHMENT","CENTRAL SUBZONE","ONE NORTH","XILIN","TANJONG PAGAR","LAKESIDE","TURF CLUB","MONK'S HILL","CECIL","KAMPONG BUGIS","NEWTON CIRCUS","KENT RIDGE","TANGLIN","BOULEVARD","MOUNT PLEASANT","CHANGI POINT","QUEENSWAY","BOAT QUAY","CLARKE QUAY","KAMPONG GLAM","NATIONAL UNIVERSITY OF S'PORE","SELEGIE","MACKENZIE","FORT CANNING","SOMERSET","BUGIS","SINGAPORE POLYTECHNIC","JURONG GATEWAY","PEOPLE'S PARK","DHOBY GHAUT","PATERSON","NORTHSHORE","SELETAR","PHILLIP","RAFFLES PLACE","JURONG RIVER","BAYFRONT SUBZONE","CLIFFORD PIER","SEMAKAU","SOUTHERN GROUP","STRAITS VIEW","INTERNATIONAL BUSINESS PARK","SINGAPORE GENERAL HOSPITAL","JURONG ISLAND AND BUKOM","SUDONG","ROCHOR CANAL","JOO KOON","KALLANG WAY","PENJURU CRESCENT","GUL BASIN","TUAS VIEW EXTENSION","LORONG HALUS NORTH","CHIN BEE","TUAS BAY","SAMULUN","PANDAN","KALLANG BAHRU","BENOI SECTOR","GUL CIRCLE","LIU FANG","BIDADARI","TENGEH","AIRPORT ROAD","BRICKWORKS","SAFTI","TOH TUCK","YIO CHU KANG","PAYA LEBAR EAST","TAMPINES NORTH","SERANGOON NORTH IND ESTATE","PAYA LEBAR NORTH","LORONG HALUS","PAYA LEBAR WEST","TUAS NORTH","GALI BATU","CHANGI AIRPORT","LIM CHU KANG","SENOKO SOUTH","PANG SUA","SELETAR AEROSPACE PARK","CONEY ISLAND","PULAU PUNGGOL BARAT","WOODLANDS REGIONAL CENTRE","NORTH-EASTERN ISLANDS","PUNGGOL CANAL","CENTRAL WATER CATCHMENT","ANSON","MARINA SOUTH","TUAS VIEW","CITY TERMINALS","MAXWELL","MARINA EAST","EAST COAST","PIONEER SECTOR","TUKANG","ISTANA NEGARA","MARINA EAST (MP)","MARINA CENTRE","CITY HALL","PORT","JURONG PORT","SHIPYARD","BRAS BASAH","DEFU INDUSTRIAL PARK","TUAS PROMENADE","LOYANG WEST","CHANGI BAY","TENGAH","PLAB","KIAN TECK","PULAU SELETAR","SIMPANG NORTH","TANJONG IRAU","MANDAI WEST","THE WHARVES","PULAU PUNGGOL TIMOR","GREENWOOD PARK","MANDAI EAST","SIMPANG SOUTH","KRANJI","RESERVOIR VIEW","SENOKO WEST","YIO CHU KANG NORTH","SENOKO NORTH","SENGKANG WEST","PASIR RIS WAFER FAB PARK"];

const SUBZONE_DATA = [5710,5630,5490,5120,5040,4590,3710,3590,3500,3320,3090,3020,2960,2420,2380,2250,2200,2170,2170,1990,1970,1910,1830,1820,1800,1800,1790,1760,1750,1730,1720,1660,1640,1600,1590,1560,1550,1530,1500,1450,1430,1370,1360,1360,1360,1350,1350,1340,1330,1320,1320,1310,1250,1250,1240,1210,1130,1130,1130,1120,1060,1040,1030,1000,1000,990,970,950,950,950,910,910,870,870,860,820,810,810,800,780,780,760,760,740,700,690,670,650,640,630,630,590,590,580,560,560,560,550,550,540,530,530,520,520,510,510,500,500,500,500,480,480,470,470,460,460,440,440,440,430,420,410,410,410,400,390,390,390,390,380,380,380,370,370,350,350,350,330,330,320,310,300,300,300,290,280,280,280,260,260,240,240,230,210,210,210,200,200,200,190,180,180,180,180,180,170,160,150,150,140,130,130,120,120,120,120,110,110,100,90,90,90,80,80,80,70,60,60,60,60,50,50,50,50,40,40,40,40,40,40,40,30,30,30,30,20,20,20,20,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

class Children extends React.Component { 
  constructor() {
    super();

    this.featureGroupLayer = new L.featureGroup(); 
    this.featureGroupMarkers = new L.featureGroup();
    this.featureGroupMarkers_2 = new L.featureGroup();
  }

  static propTypes = {            
    childrenSubzoneDataIsFetching:  PropTypes.bool,
    childrenAreaDataIsFetching: PropTypes.bool,
    preschoolLocationDataIsFetching: PropTypes.bool,
    childcareServicesDataIsFetching:  PropTypes.bool,

    actions: PropTypes.shape({
      enterChildren: PropTypes.func,
      leaveChildren: PropTypes.func,  
      
      fetchChildrenSubzoneDataIfNeeded:     PropTypes.func,
      fetchChildrenAreaDataIfNeeded:        PropTypes.func,
      fetchPreschoolLocationDataIfNeeded:     PropTypes.func,
      fetchChildcareServicesDataIfNeeded:      PropTypes.func
    })
  };

  state = {
    opacity: 70,
    agg: "PLANNING AREAS",
    preschools: false,
    childcareServices: false,
    showFilters: true,
    view: true
  };

  componentWillMount() {     
    const { actions: { enterChildren } } = this.props;    
    enterChildren();    

    const { actions: { fetchChildrenAreaDataIfNeeded } } = this.props;    
    fetchChildrenAreaDataIfNeeded(); 
  }
  
  componentDidMount() { }

  componentWillUnmount() {
    const { actions: { leaveChildren } } = this.props;
    leaveChildren();
  }
 
  render() {   
    const {           
      childrenAreaData,
      childrenAreaDataIsFetching,
      childrenSubzoneData,
      childrenSubzoneDataIsFetching,
      preschoolLocationData,
      preschoolLocationDataIsFetching,
      childcareServicesData,
      childcareServicesDataIsFetching
    } = this.props;
                        
    if(childrenAreaDataIsFetching || childrenSubzoneDataIsFetching || preschoolLocationDataIsFetching || childcareServicesDataIsFetching) {  
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
              symbol="baby"
              title="Pre-School Children (≤ age 4) in Singapore (Year 2017)"             
              breaks={(this.state.agg === "SUBZONE") ? [0, 330, 1060, 2250, 3710, 5710] : [0, 1080, 5090, 8640, 12260, 17660]}
              colors={["#ffffff", "#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"]}              
              attribute={"BELOW_4"}

              view={this.state.view}
              graphColor="rgba(153, 102, 255, 0.2)"
              borderColor="rgb(153, 102, 255)"
              graphData={ (this.state.agg === "SUBZONE") ? SUBZONE_DATA : PLANNING_AREAS_DATA }
              graphLabels={ (this.state.agg === "SUBZONE") ? SUBZONES : PLANNING_AREAS}              

              geojsonLayer={(this.state.agg === "SUBZONE") ? childrenSubzoneData : childrenAreaData}
              geojsonMarkers={ (this.state.childcareServices) ? childcareServicesData : undefined  }
              geojsonMarkerColor="#df387c"
              geojsonMarkerCaption="CHILDCARE SERVICES"

              geojsonMarkers_2={ (this.state.preschools) ? preschoolLocationData : undefined }
              geojsonMarkerColor_2="#56b6de"
              geojsonMarkerCaption_2="PRE-SCHOOL"
              

              tooltipCaption={(this.state.agg === "SUBZONE") ? "Subzone" : "Planning Area"}
              tooltipAttribute={ (this.state.agg === "SUBZONE") ? "SUBZONE_N" : "PLN_AREA_N"}
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
                        <th>CHILDCARE SERVICES</th>
                        <td>                        
                          <label className="toggle-switch">
                            <input type="checkbox"  
                              onChange={this.handleChangeChildcareServices}
                              checked={this.state.childcareServices}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
                        </td>
                      </tr>
                      <tr><td colSpan={2}><br /></td></tr>
                      <tr>
                        <th>PRE-SCHOOLS</th>
                        <td>                        
                          <label className="toggle-switch">
                            <input type="checkbox" 
                              onChange={this.handleChangPreSchools}
                              checked={this.state.preschools}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
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
        fetchChildrenSubzoneDataIfNeeded
      } } = this.props;

      fetchChildrenSubzoneDataIfNeeded();    
    } else if(agg === "PLANNING AREAS") {
      const { actions: {       
        fetchChildrenAreaDataIfNeeded
      } } = this.props;

      fetchChildrenAreaDataIfNeeded();    
    }

    this.setState({
        agg: agg
    });
  }

  handleChangPreSchools = (event) => {    
    if(event.target.checked) {
      const { actions: {       
        fetchPreschoolLocationDataIfNeeded
      } } = this.props;

      fetchPreschoolLocationDataIfNeeded();  
    } else {
      this.featureGroupMarkers_2.eachLayer((layer) => {
        this.featureGroupMarkers_2.removeLayer(layer);
      });
    }

    this.setState({
        preschools: event.target.checked
    });
  }

  handleChangeChildcareServices = (event) => {
    if(event.target.checked) {
      const { actions: {       
        fetchChildcareServicesDataIfNeeded
      } } = this.props;

      fetchChildcareServicesDataIfNeeded();  
    } else {
      this.featureGroupMarkers.eachLayer((layer) => {
        this.featureGroupMarkers.removeLayer(layer);
      });
    }    

    this.setState({        
      childcareServices: event.target.checked
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
    
    childrenSubzoneDataIsFetching:  state.childrenSubzoneData.isFetching,    
    childrenSubzoneData: state.childrenSubzoneData.data,

    childrenAreaDataIsFetching:  state.childrenAreaData.isFetching,    
    childrenAreaData: state.childrenAreaData.data,

    preschoolLocationDataIsFetching: state.preschoolLocationData.isFetching,
    preschoolLocationData: state.preschoolLocationData.data,

    childcareServicesDataIsFetching: state.childcareServicesData.isFetching,
    childcareServicesData: state.childcareServicesData.data
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterChildren: actions.enterChildren,
        leaveChildren: actions.leaveChildren,
        
        fetchChildrenAreaDataIfNeeded: actions.fetchChildrenAreaDataIfNeeded,
        fetchChildrenSubzoneDataIfNeeded: actions.fetchChildrenSubzoneDataIfNeeded,
        fetchPreschoolLocationDataIfNeeded: actions.fetchPreschoolLocationDataIfNeeded,
        fetchChildcareServicesDataIfNeeded: actions.fetchChildcareServicesDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Children);