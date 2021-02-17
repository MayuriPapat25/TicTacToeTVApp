import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert,
  Text
} from 'react-native';

class Game extends Component {

  constructor(props) {
    super(props);

    this.moveAnimation = new Animated.ValueXY({x: 20, y: 0});

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  movePlayerText = player => {
    Animated.spring(this.moveAnimation, {
      toValue: (player === 1 ? {x: 20, y: 0} : {x: Dimensions.get('window').width - 100, y: 0})
    }).start();
  };

  initializeGame = () => {
    console.log("hdgsdjhf");
    this.setState({
      gameState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
      ],
      currentPlayer: 1
    });
    this.movePlayerText(1);
  };

  componentDidMount() {
    this.initializeGame();
  }

  renderIcon(row, col) {

    let value = this.state.gameState[row][col];
    console.log("value",value);
    switch (value) {
      case 1:
        console.log("tilex",styles.tileX);
        return <Text>X</Text>
        // <Icon name="md-close" style={styles.tileX}/>;
      case -1:
        console.log("tileo",styles.tileO);
        return  <Text>O</Text>
        // <Icon name='md-radio-button-of' style={styles.tileO}/>;
      case 0:
        return <View/>
    }
  }

  getWinner = () => {
    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum = 0;

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) return 1;
      else if (sum === -3) return -1;
    }

    for (let i = 0; i < NUM_TILES; i++) {
      sum = sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) return 1;
      else if (sum === -3) return -1;
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) return 1;
    else if (sum === -3) return -1;

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) return 1;
    else if (sum === -3) return -1;

    return 0;
  };

  onTilePress(row, col) {
    console.log("ontilepress");
    let value = this.state.gameState[row][col];
    if (value !== 0) return;

    let player = this.state.currentPlayer;
    let arr = this.state.gameState.slice();
    arr[row][col] = player;
    this.setState({gameState: arr});
    let nextPlayer = (player === 1 ? -1 : 1);
    this.setState({currentPlayer: nextPlayer});
    this.movePlayerText(nextPlayer);

    let winner = this.getWinner();
    if (winner === 1) {
        Alert.alert("1. maaaa");
        this.initializeGame();
    } else if (winner === -1) {
        Alert.alert("2. dffdd");
        this.initializeGame();
    }
  }


render() {
  return (
    <View style={styles.container}>
      <Animated.Text
        onScroll={Animated.event(
          [{ nativeEvent: {
              contentOffset: {
                x: 100
              }
            }
          }],{ useNativeDriver: true } 
        )}
     
        style={[styles.player, this.moveAnimation.getLayout()]}>{this.state.currentPlayer === 1 ? 1 : 2}.
      </Animated.Text>
      <View style={styles.flexRow}>
        <TouchableOpacity 
          style={[styles.tiles, {borderLeftWidth: 0, borderTopWidth: 0}]}
          onPress={() => {this.onTilePress(0, 0)}}
        >
          
          <Text>{() =>this.renderIcon(0, 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {borderTopWidth: 0}]}
          onPress={() => this.onTilePress(0, 1)}
        >
          {() => this.renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {borderRightWidth: 0, borderTopWidth: 0}]}
          onPress={() => this.onTilePress(0, 2)}
        >
          {() => this.renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity 
          style={[styles.tiles, {borderLeftWidth: 0}]}
          onPress={() => this.onTilePress(1, 0)}
        >
          {() => this.renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {}]} 
          onPress={() => this.onTilePress(1, 1)}
        >
          {() => this.renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {borderRightWidth: 0}]}
          onPress={() => this.onTilePress(1, 2)}
        >
          {() => this.renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={styles.flexRow}>
        <TouchableOpacity 
          style={[styles.tiles, {borderLeftWidth: 0, borderBottomWidth: 0}]}
          onPress={() => this.onTilePress(2, 0)}
        >
          {() => this.renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {borderBottomWidth: 0}]}
          onPress={() => this.onTilePress(2, 1)}
        >
          {() => this.renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tiles, {borderRightWidth: 0, borderBottomWidth: 0}]}
          onPress={() => this.onTilePress(2, 2)}
        >
          {() => this.renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={{padding: 20}}/>
        <Button title='Start' onPress={this.initializeGame}/>
    </View>
  );
}
}
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  player: {
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    marginBottom: 60,
    alignSelf: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tiles: {
    borderWidth: 5,
    width: 100,
    height: 100,
    justifyContent: 'center'
  },
  tileX: {
    fontSize: 30,
    color: 'blue',
    alignSelf: 'center',
    backgroundColor:'red'

  },
  tileO: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    backgroundColor:'red'
  }
});
