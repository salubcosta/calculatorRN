import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Buttons from './components/Button';
import Display from './components/Display';

const App = ()=>{

    const initialState =()=> {
        setDisplayValue('0');
        setClearDisplay(false);
        setOp(null);
        setValues([0,0]);
        setCurrent(0);
    }

    const [displayValue, setDisplayValue] = useState('0');
    const [clearDisplay, setClearDisplay] = useState(false);
    const [op, setOp] = useState(null);
    const [values, setValues] = useState([0,0]);
    const [current, setCurrent] = useState(0);

    const addDigit = n =>{        
        // Esta validação faz com que não seja incluído 0 à esquerda. Ex: 00086.2 
        const _clearDisplay = displayValue === '0' || clearDisplay;

         // Esta validação não deixa incluir mais de 1 ponto. Ex: 84.5.2
        if(n ==='.' && !_clearDisplay && displayValue.includes('.')){
            return
        }

        const _current = _clearDisplay ? '' : displayValue;
        const _displayValue = _current + n;

        setDisplayValue(_displayValue); // Atualiza display
        setClearDisplay(false) ; //Seta pra false para atribuir valor _current linha 31

        if(n !== '.'){
            const _newValue = parseFloat(_displayValue);
            const _values = values;
            _values[current] = _newValue;
            setValues(_values)
        }
    }

    const clearMemory = ()=>{
        initialState();
    }

    const setOperation = operation =>{
        if(current===0){
            setOp(operation);
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const equals = operation === '=';
            const _values = values;
            try{
                // A função eval faz isso: eval('1 + 1') resultar em 2
                _values[0] = eval(`${_values[0]} ${op} ${_values[1]}`);
            }catch(e){
                _values[0] = values[0];
            }

            _values[1] = 0;
            setDisplayValue(`${_values[0]}`);
            
            _setOp = equals ? null : operation;
            setOp(_setOp);

            _setCurrent = equals ? 0 : 1;
            setCurrent(_setCurrent);
            
            setClearDisplay(!equals);

            setValues(_values);
        }
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