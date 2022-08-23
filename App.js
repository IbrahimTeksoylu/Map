import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import {Image} from 'react-native';

const mapData = require('./mapData.json');

class App extends Component {
  constructor() {
    super();
    this.state = {data: mapData};
  }
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 50}}>
        <MapView
          showsUserLocation={true}
          zoomEnabled={true}
          zoom={10}
          style={styles.map}
          region={{
            latitude: 53.375789,
            longitude: -1.47367,
            latitudeDelta: 0.001,
            longitudeDelta: 0.31,
          }}
          provider="google">
          {this.state.data.map((dynamicData, i) => (
            <Marker
              coordinate={{
                latitude: dynamicData.Latitude,
                longitude: dynamicData.Longitude,
              }}
              description={
                dynamicData.Description +
                dynamicData.Latitude +
                dynamicData.Longitude
              }
              title={dynamicData.siteName}
              pinColor={dynamicData.pinColor}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Image
                source={require('./car-crash.png')}
                style={{height: 35, width: 35}}
              />
            </Marker>
          ))}
        </MapView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text
              style={{
                position: 'absolute',
                right: 10,
                fontSize: 50,
                color: 'red',
              }}>
              X
            </Text>
          </TouchableHighlight>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                marginTop: 100,
                marginLeft: 30,
                width: 100,
                height: 100,
              }}>
              {this.state.data.map((dynamicData, i) => (
                <Text style={{fontSize: 20}}>{dynamicData.siteName}</Text>
              ))}
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 100,
                flexDirection: 'column',
                width: 50,
              }}>
              {this.state.data.map((dynamicData, i) => (
                <Text style={{fontSize: 20}}>{dynamicData.battery}</Text>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  map: {
    marginTop: 0,
    width: '100%',
    height: '100%',
  },
});
