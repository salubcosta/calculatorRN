import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Buttons from './components/Button';
import Display from './components/Display';

const App = ()=>{

    const [displayValue, setDisplayValue] = useState(2);

    const addDigit = n =>{
        setDisplayValue(n)
    }

    const clearMemory = ()=>{
        setDisplayValue(0)
    }

    const setOperation = operation =>{
        alert(operation)
    }

    return(
        <View style={styles.container}>
            <Display value={displayValue} />
            <View style={styles.buttons}>
                <Buttons label='AC' triple onClick={clearMemory} />
                <Buttons label='/' operation onClick={setOperation} />
                <Buttons label='7' onClick={addDigit} />
                <Buttons label='8' onClick={addDigit}/>
                <Buttons label='9' onClick={addDigit}/>
                <Buttons label='*' operation onClick={setOperation}/>
                <Buttons label='4' onClick={addDigit}/>
                <Buttons label='5' onClick={addDigit}/>
                <Buttons label='6' onClick={addDigit}/>
                <Buttons label='-' operation onClick={setOperation}/>
                <Buttons label='1' onClick={addDigit}/>
                <Buttons label='2' onClick={addDigit}/>
                <Buttons label='3' onClick={addDigit}/>
                <Buttons label='+' operation onClick={setOperation}/>
                <Buttons label='0' double onClick={addDigit}/>
                <Buttons label='.' onClick={addDigit}/>
                <Buttons label='=' operation onClick={setOperation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    buttons:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default App;