import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Spinner} from 'native-base'
import poke from './assets/img/poke.png'
import Tarjeta from './components/Tarjeta'
import Paginar from './components/Paginar'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            result: null,
            limit: 7,
            pagina: 1
        }

        this.scroll = React.createRef();
    }

    componentDidMount(){
        this.getData(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=0`)
    }

    getData = async (url) => {
        try{
            let result = await fetch(url)
            let json = await result.json()
            await this.setState({result: json.results})
        }catch(e){
            console.log(e)
        }
    }

    paginar = async (opcion) => {
        this.scroll.scrollTo({y: 0, animated:true})
        if(opcion==1){
            await this.setState({pagina: this.state.pagina + 1})
        }else{
            this.state.pagina>1?await this.setState({pagina: this.state.pagina - 1}):null
        }
        this.getData(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${(this.state.pagina-1)*this.state.limit}`)
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'center', backgroundColor: '#dc3545', width: Dimensions.get('window').width}}>
                    <Image
                        style={{ height: 100, alignSelf: 'center', marginTop:20, marginBottom:20}}
                        source={require("./assets/img/poke.png")}
                    />
                </View>
                <ScrollView ref={(ref) => { this.scroll = ref }}>
                    <View style={{marginTop: 10}}>
                        {
                            this.state.result?
                            this.state.result.map((ele, index) => {
                                return <Tarjeta key={index} 
                                            pokemon={ele.name}
                                            width= {Dimensions.get('window').width}
                                            url={ele.url}
                                        />
                            }) : 
                                 <Spinner color='red'/>
                            
                        }
                    </View>
                    <Paginar
                        pagina={this.state.pagina}
                        paginar={this.paginar}
                    />
                </ScrollView>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent: 'center',
    }

});


