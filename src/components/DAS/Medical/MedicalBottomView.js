import React from 'react';
import {connect} from 'dva';
import styles from './MedicalBottomView.less';

class MedicalBottomView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let dispatch = this.props.dispatch;
        this.props.dispatch({
            type: 'medicalBottomModel/setDispatch',
            payload: dispatch
        })
        this.props.dispatch({
            type: 'medicalBottomModel/getChartsData'
        })
    }

    listView = () => {
        let content = this.props.model.bottomChartContent;
        let currentThis = this;
        if (content === null) {
            return null;
        }
        let NewWidth = content.Scales.split(":");
        let scalesAnd = 0;
        for (let i = 0; i < NewWidth.length; i++) {
            scalesAnd += parseInt(NewWidth[i]);
        }
        let xwidthAnd = [];
        for (let j = 0; j < NewWidth.length; j++) {
            let xwidth = parseInt(NewWidth[j]) / scalesAnd * 100 + "%";
            xwidthAnd.push(xwidth);
        }
        let listView = content.Charts.map(function (content, elem) {
            let chartTitle = elem;
            let style = {
                width: xwidthAnd[elem],
                height: "100%",
                float: "left",
            }

            return (
                <div key={"gzh" + elem} style={style}>
                    <div id={content.id} className={styles.chartView}></div>
                </div>
            )
        })
        return listView;
    }

    render() {
        return (
            <div className={styles.backgroundView}>
                {this.listView()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        model: state.envModel,
    }
}

export default connect(mapStateToProps)(MedicalBottomView);
