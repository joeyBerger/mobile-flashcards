import React from 'react'
import { Text, View, StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import { removeDeck } from '../actions'
import { getItem } from '../utils/api'
import colors from '../utils/colors'
import { Button } from 'react-native-elements';

class InspectedDeck extends React.Component {
    handleAddCard = () => {
        this.props.navigation.navigate('AddQuestion', {title: this.props.route.params.key});        
    }
    handleStartQuiz = () => {
        const {key} = this.props.route.params
        if (this.props.decks[key].questions.length === 0) {
            this.props.navigation.navigate('NoCardWarning')
        } else {
            this.props.navigation.navigate('QuizManager', {key: this.props.route.params.key})
        }
    }    
    handleDeleteDeck = (title) => {
        this.props.dispatch(removeDeck(title))
        this.props.navigation.navigate('DeckList');
        getItem(title)
    }
    render() {
        const {key} = this.props.route.params
        const deck = this.props.decks[key]
        if (deck === undefined) {
            return null
        }
        const cardsStr = deck.questions.length === 1 ? 'Card' : 'Cards'
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: 50}}>
                    <Text style={styles.deckNameText}>
                        {deck.title}                 
                    </Text>
                    <Text style={styles.cardsText}>
                        {deck.questions.length} {cardsStr} 
                    </Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonView}>
                            <Button 
                            onPress = {() => this.handleAddCard()}
                            title="Add Card"
                            raised={true}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color:colors.black}}
                            />
                        </View> 
                        <View style={styles.buttonView}>
                            <Button 
                            onPress = {() => this.handleStartQuiz()}
                            title="Start Quiz"
                            raised={true}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color:colors.black}}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <Button 
                            onPress = {() => this.handleDeleteDeck(deck.title)}
                            title="Delete Deck"
                            raised={true}
                            buttonStyle={styles.deleteButtonStyle}
                            titleStyle={{color:colors.black}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.blue
    },
    deckNameText: {
        fontSize:30,
        padding: 8,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        textAlign: 'center',
    },    
    cardsText: {
        fontSize: 20,
        paddingBottom: 20,
    },
    buttonContainer: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        textAlign: 'center',
        padding: 70,
    },
    buttonView: {
        paddingBottom:50
    },
    buttonStyle : {
        backgroundColor: colors.orange,
        height: 40,
        width: 150
    },
    deleteButtonStyle : {
        backgroundColor: colors.red,
        height: 40,
        width: 150
    }
})

function mapStateToProps({decks}) {
    return{
        decks
    }
}

export default connect(mapStateToProps)(InspectedDeck)
