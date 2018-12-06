import React, {
  Component
}                         from 'react';
import PropTypes          from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import { default as AnimatedView } from 'components/AnimatedView';
import { default as ElderlyMap } from 'components/ElderlyMap';
import Slider from 'rc-slider';

import L from "leaflet";

import loading from 'img/loading.gif';

// Mapping State to Props
// Mapping Dispatch to Props
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../redux/actions';

class Elderly extends React.Component { 
  constructor() {
    super();

    this.featureGroupLayer = new L.featureGroup();   
  }

  static propTypes = {            
    elderlySubzoneDataIsFetching:  PropTypes.bool,
    elderlyAreaDataIsFetching: PropTypes.bool,

    actions: PropTypes.shape({
      enterElderly: PropTypes.func,
      leaveElderly: PropTypes.func,  
      
      fetchElderlySubzoneDataIfNeeded:     PropTypes.func,
      fetchElderlyAreaDataIfNeeded:        PropTypes.func
    })
  };

  state = {
    opacity: 70,
    agg: "PLANNING AREAS",   
    showFilters: true
  };

  componentWillMount() {     
    const { actions: { enterElderly } } = this.props;           
    enterElderly();    

    const { actions: { fetchElderlyAreaDataIfNeeded } } = this.props;
    fetchElderlyAreaDataIfNeeded();    
  }
  
  componentDidMount() {            
  }

  componentWillUnmount() {
    const { actions: { leaveElderly } } = this.props;
    leaveElderly();    
  }
 
  render() {   
    const {           
      elderlyAreaData,
      elderlyAreaDataIsFetching,
      elderlySubzoneData,
      elderlySubzoneDataIsFetching     
    } = this.props;
                        
    if(elderlyAreaDataIsFetching || elderlySubzoneDataIsFetching) {  
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
            <ElderlyMap
              symbol="elderly"
              title="Distribution of Elderly (≥ age 65) in Singapore (Year 2017)"             
              breaks={(this.state.agg === "SUBZONE") ? [0,920,2470,4390,9170,16400] : [0,4690,14220,23250,30970,46510]}
              colors={["#ffffff", "#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"]}              
              attribute={"ABOVE_65"}
              geojsonLayer={(this.state.agg === "SUBZONE") ? elderlySubzoneData : elderlyAreaData}         
              tooltipCaption={(this.state.agg === "SUBZONE") ? "Subzone" : "Planning Area"}
              tooltipAttribute={ (this.state.agg === "SUBZONE") ? "SUBZONE_N" : "PLN_AREA_N"}
              opacity={this.state.opacity}
              featureGroupLayer={this.featureGroupLayer}          
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
    elderlyAreaData: state.elderlyAreaData.data
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
        fetchPreschoolLocationDataIfNeeded: actions.fetchPreschoolLocationDataIfNeeded,
        fetchChildcareServicesDataIfNeeded: actions.fetchChildcareServicesDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elderly);