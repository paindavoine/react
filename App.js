import React, { Component } from 'react';
import * as json from './data.json';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

// import des données utilisé pour le projet
var kebabs = json.data.map(function (item) {
  return {
    bizId: item.bizId,
    name: item.searchResultBusiness.name,
    phone: item.searchResultBusiness.phone,
    lat: item.lat,
    lng: item.lng,
    tags: item.tags,
    photo: item.scrollablePhotos.photoList[0].src,
    cat: item.searchResultBusiness.categories,
    neighborhoods: item.searchResultBusiness.neighborhoods,
    formattedAddress: item.searchResultBusiness.formattedAddress,
    price: item.searchResultBusiness.priceRange,
  };
});

export default class App extends Component {
  constructor(...args) {
    super(...args);
    // On s'assure qui le "this" de handleButtonClick soit
    // toujours l'instance de App
    this.state = {
      Selected: null

    }
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  // affichage des doonées à l'écrant
  render() {
    let content = null;
    if (this.state.Selected) {
      content = <View>
        {this.renderSelectedVideo()}
        <Button title="retour" onPress={() => this.handleButtonPress()} />
      </View>
    }
    else {
      content = <ScrollView>
        {this.renderList()}
      </ScrollView>;
    }

    return (
      <View style={{ padding: 20 }}>
        <View>
          <Text style={styles.titre}>Ryelp</Text>
        </View>
        {content}
      </View>
    );
  }

//  fonction affichant toutes les infirmations nécessaire pour un kebab
  renderList() {
    const List = [];
    kebabs.forEach(kebab => {
      List.push(
        <TouchableHighlight onPress={() => this.handleButtonPress(kebab)}>
          <View key={kebab.thumbnail + kebab.kebab}>
            <View style={styles.VuePrincipal}>
              <View style={styles.VueImage}>
                <Image style={styles.Image} source={{ uri: kebab.photo }} />
              </View>
              <View style={styles.VueInfo}>
                <Text style={styles.detailName}>{kebab.name}</Text>
                <Text style={styles.detailtype}>{this.getString(kebab.cat)}</Text>
                <Text style={styles.detaillieu}>{kebab.neighborhoods}</Text>
                <Text style={styles.detailadd}>{kebab.formattedAddress}</Text>

              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
    return List;
  }

  // Afficher les details du kebab selectionné apres l'avoir selectionné dans la liste de tous les kebabs
  renderSelectedVideo() {
    if (this.state.Selected) {
      return <View style={styles.detailSelected}>
        <View style={styles.detailSelectedImage}>
          <Image source={{ uri: this.state.Selected.photo }} />
        </View>
        <View style={styles.detailSelectedInfos}>
          <Text style={styles.detailName}>{this.state.Selected.name}</Text>
          <Text style={styles.detailName}>{this.state.Selected.phone}</Text>
          <Text style={styles.detailtype}>{this.getString(this.state.Selected.cat)}</Text>
          <Text style={styles.detaillieu}>{this.state.Selected.neighborhoods}</Text>
          <Text style={styles.detailadd}>{this.state.Selected.formattedAddress}</Text>
        </View>
      </View>
    }
    return null;
  }

  // Focntion permettant au clik d'avoir les detail
  handleButtonPress(KebabAll) {
    this.setState({
      Selected: KebabAll
    }
    );

  }
  // Focntion permettant au clik de revenir sur la liste de tous les kebabs
  handleButtonPress2() {
    this.setState({
      Selected: null
    }
    );

  }

 // Permet l'affichage du detail de la catégorie du kebab
  getString(cat) {
    ListCat = [];
    infocat = "€ • ";

    count = 0
    cat.forEach(cat => {
      if (count == 0) {
        infocat += cat.title
      } else {
        // Ajoute une virgule pour si il ya plusieur catégories
        infocat += ", " + cat.title
      }
      count += 1
    });

    return infocat
  }




}

// Style utilisés pour l'affichage
const styles = StyleSheet.create({
  titre: {
    fontSize: 30,
    padding: 20,
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  VuePrincipal: {
    height: 150

  },
  VueImage: {
    height: '50%',
    left: 0,
    width: '50%',
    position: 'absolute',
  },
  VueInfo: {
    height: '100%',
    right: 0,
    width: '50%',
    position: 'absolute',
  },
  Image: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"

  },
  detailName: {
    fontSize: 20
  },
  detailtype: {
    fontSize: 15
  },
  detaillieu: {
    color: "rgb(173,173,173)",
    fontSize: 14,
  },
  detailadd: {
    color: "rgb(173,173,173)",
    fontSize: 14,
  },
  detailSelected: {
    height: 150
  },
  detailSelectedImage: {
    height: 120,
    width: 120,
    left: 0,
    top: 0,
    position: "absolute",
  },
  detailSelectedInfos: {
    height: 120,
    left: 120,
    top: 0,
    right: 0,
    position: "absolute"
  }
});