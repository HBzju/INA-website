var React=require("react");
var ReactDOM=require("react-dom");
var style=require("./Department.css");
var $=require("jquery");
var Header=require("./../../Common/Header/Header");
var Footer=require("./../../Common/Footer/Footer");
var InfoBox=require("./InfoBox/InfoBox");
var ActiveTag=require("./ActiveTag/ActiveTag");

var Department=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0,
            tagList:["战略/VC部","产品/运营部","技术部","设计部"],
            currActive:0    //当前显示部门的key值
        }
    },
    autoChange:function(){
        setInterval(function(){
            var curr=this.state.currActive;
            var next=(curr+1)>=4?0:curr+1;
            this.setState({
                currActive:next
            })
        }.bind(this),5000)
    },
    componentWillMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        })
    },
    componentDidMount:function(){
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this));
        this.autoChange();
    },
    updateActive:function(i){
        this.setState({
            currActive:i
        })
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };
        var tags=this.state.tagList.map(function(item,i){
            if(i==this.state.currActive) return(
                <ActiveTag key={i}>{item}</ActiveTag>
            );
            else return(
                <div
                    key={i}
                    className={style.tag}
                    onClick={this.updateActive.bind(this,i)}
                >
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div className={style.container} style={conStyle}>
                <div className={style.tagBox}>
                    {tags}
                </div>
                <InfoBox
                    midHeight={this.state.midHeight}
                    currActive={this.state.currActive}
                />
            </div>
        )
    }
});

var App=React.createClass({
    render:function(){
        return (
            <div>
                <Header />
                <Department />
                <Footer />
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById("app")
)