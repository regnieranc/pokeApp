import React, {Component } from 'react'
import {View, StyleSheet, Text, Image, Modal} from 'react-native'
import {Button, Content, Container, Card, CardItem, Thumbnail, Body, Left, H1} from 'native-base'

export default class index extends Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
            pokemon: "",
            uri: "",
            detalle:""
        }
    }

    getNumber = url => {
        return url.split('/')[6]
    }

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getDetalle = async url => {
        try{
            let data = await fetch(url)
            let json = await data.json()
            let detalle="";
            detalle+="Altura: " + json.height
            detalle+="\n\nPeso: " + json.weight
            detalle+="\n\nMovimientos: "
            let aux=""
            json.moves.map((ele, index) =>{
                index<20?aux+=ele.move.name + " - ":null
                
            })
            detalle+=aux
            this.setState({detalle})
        }catch(e){
            console.log(e)
        }
    }

    click = () => {
        this.getDetalle("https://pokeapi.co/api/v2/pokemon/"+this.getNumber(this.props.url))
        this.setState({visible:true, pokemon: this.capitalizeFirstLetter(this.props.pokemon), uri:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getNumber(this.props.url)+".png"})
    }

    render(){
        return(
            <View style={{borderStyle: "solid", borderColor: "#dc3545", margin: 20}}>
                <Image 
                    style={{width: 250, height: 250, alignSelf:'center'}}
                    source= {{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.getNumber(this.props.url)+".png"}}
                />
                <Button  block rounded style={{backgroundColor:'#dc3545', display: 'flex', justifyContent:'center', marginTop:10, marginBottom: 10, width:250, alignSelf:'center'}} danger onPress={this.click}>
                    <View>
                        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: "bold"}}>{this.capitalizeFirstLetter(this.props.pokemon) }</Text>
                    </View>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.visible}
                 >
                        <Container>
                            <Content style={{padding:20}}>
                                <Card  transparent style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: this.state.uri}} />
                                        <Body>
                                        <H1>{this.state.pokemon}</H1>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Image source={{uri: this.state.uri}} style={{height: 200, width: 200, flex: 1, alignSelf:'center'}}/>
                                        <Text>
                                            {this.state.detalle}
                                        </Text>
                                    </Body>
                                </CardItem>
                                    <Button rounded block style={{marginTop: 30, backgroundColor:'#dc3545', display: 'flex', justifyContent:'center'}} danger onPress={() => this.setState({visible:false, detalle: ""})}>
                                        <Text style={{fontSize:18, fontWeight: 'bold',color: 'white', textAlign: 'center'}}>atras</Text>
                                    </Button>
                                </Card>
                                
                            </Content>
                        </Container>
                     
                     
                    
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card : {
        
    }
})