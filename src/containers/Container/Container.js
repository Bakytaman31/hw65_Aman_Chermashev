import React, {Component} from 'react';
import axiosApp from "../../axios-app";
import Spinner from "../../components/Spinner/Spinner";

class Container extends Component {
    state = {
      data: [],
        name: '',
      loading: true,
    };

    async componentDidMount() {
        this.getData();
    }
     componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name){
            this.getData();
        }
    }

    getData = async () => {
        const name = this.props.match.params.name;
        let data = [];
        const request = await axiosApp.get(`${name}.json`);
        data.push(request.data);
        this.setState({data, loading: false, name: name})
    };

    render() {
        let data = <Spinner/>;
        if (!this.state.loading){
            data = this.state.data.reverse().map(data => (
                <div key={data}>
                <h2 style={{textTransform: 'capitalize'}}>{data.title}</h2>
                <p>{data.description}</p>
                </div>
            ))
        }

        return (
            <div>
                {data}
            </div>
        );
    }
}

export default Container;