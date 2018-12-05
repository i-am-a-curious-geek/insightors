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

class Baby extends React.Component { 
  constructor() {
    super();

    this.featureGroupLayer = new L.featureGroup(); 
    this.featureGroupMarkers = new L.featureGroup();
    this.featureGroupMarkers_2 = new L.featureGroup();
  }

  static propTypes = {            
    babySubzoneDataIsFetching:  PropTypes.bool,
    babyAreaDataIsFetching: PropTypes.bool,
    preschoolLocationDataIsFetching: PropTypes.bool,
    childcareServicesDataIsFetching:  PropTypes.bool,

    actions: PropTypes.shape({
      enterBaby: PropTypes.func,
      leaveBaby: PropTypes.func,  
      
      fetchBabySubzoneDataIfNeeded:     PropTypes.func,
      fetchBabyAreaDataIfNeeded:        PropTypes.func,
      fetchPreschoolLocationDataIfNeeded:     PropTypes.func,
      fetchChildcareServicesDataIfNeeded:      PropTypes.func
    })
  };

  state = {
    opacity: 70,
    agg: "PLANNING AREAS",
    preschools: false,
    childcareServices: false,
    showFilters: true
  };

  componentWillMount() {     
    const { actions: { enterBaby } } = this.props;           
    enterBaby();    
  }
  
  componentDidMount() {        
    const { actions: {       
      fetchBabyAreaDataIfNeeded
    } } = this.props;

    fetchBabyAreaDataIfNeeded();    
  }

  componentWillUnmount() {
    const { actions: { leaveBaby } } = this.props;
    leaveBaby();    
  }
 
  render() {   
    const {           
      babyAreaData,
      babyAreaDataIsFetching,
      babySubzoneData,
      babySubzoneDataIsFetching,
      preschoolLocationData,
      preschoolLocationDataIsFetching,
      childcareServicesData,
      childcareServicesDataIsFetching
    } = this.props;
                        
    if(babyAreaDataIsFetching || babySubzoneDataIsFetching || preschoolLocationDataIsFetching || childcareServicesDataIsFetching) {  
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
            <Map
              symbol="baby"
              title="Distribution of Pre-School Children (≤ age 4) in Singapore (Year 2017)"             
              breaks={(this.state.agg === "SUBZONE") ? [0, 330, 1060, 2250, 3710, 5710] : [0, 1080, 5090, 8640, 12260, 17660]}
              colors={["#ffffff", "#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"]}              
              attribute={"BELOW_4"}
              geojsonLayer={(this.state.agg === "SUBZONE") ? babySubzoneData : babyAreaData}
              geojsonMarkers={ (this.state.preschools) ? preschoolLocationData : undefined }
              geojsonMarkers_2={ (this.state.childcareServices) ? childcareServicesData : undefined  }
              tooltipCaption={(this.state.agg === "SUBZONE") ? "Subzone" : "Planning Area"}
              tooltipAttribute={ (this.state.agg === "SUBZONE") ? "SUBZONE_N" : "PLN_AREA_N"}
              opacity={this.state.opacity}
              featureGroupLayer={this.featureGroupLayer}
              featureGroupMarkers={this.featureGroupMarkers}
              featureGroupMarkers_2={this.featureGroupMarkers_2}
            />
          </div>
          <div id="filter-box">
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

  handleAggregationChange = (event) => {
    event.preventDefault();
    let agg = event.target.value;

    if(agg === "SUBZONE") {
      const { actions: {       
        fetchBabySubzoneDataIfNeeded
      } } = this.props;

      fetchBabySubzoneDataIfNeeded();    
    } else if(agg === "PLANNING AREAS") {
      const { actions: {       
        fetchBabyAreaDataIfNeeded
      } } = this.props;

      fetchBabyAreaDataIfNeeded();    
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
      this.featureGroupMarkers.eachLayer((layer) => {
        this.featureGroupMarkers.removeLayer(layer);
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
      this.featureGroupMarkers_2.eachLayer((layer) => {
        this.featureGroupMarkers_2.removeLayer(layer);
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
    
    babySubzoneDataIsFetching:  state.babySubzoneData.isFetching,    
    babySubzoneData: state.babySubzoneData.data,

    babyAreaDataIsFetching:  state.babyAreaData.isFetching,    
    babyAreaData: state.babyAreaData.data,

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
        enterBaby: actions.enterBaby,
        leaveBaby: actions.leaveBaby,
        
        fetchBabyAreaDataIfNeeded: actions.fetchBabyAreaDataIfNeeded,
        fetchBabySubzoneDataIfNeeded: actions.fetchBabySubzoneDataIfNeeded,
        fetchPreschoolLocationDataIfNeeded: actions.fetchPreschoolLocationDataIfNeeded,
        fetchChildcareServicesDataIfNeeded: actions.fetchChildcareServicesDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Baby);