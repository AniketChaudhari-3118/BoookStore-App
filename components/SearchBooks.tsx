
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export const SearchBooks = (props: any) => {
    const [data, setData] = useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'aliceblue' }}>
                {/*To navigate back to HomePage*/}
                <TouchableOpacity onPress={() => props.navigation.navigate('HomePage')}
                    style={{ width: "10%", height: "65%", marginLeft: "4%", justifyContent: 'center' }}>
                    <Image
                        source={require('./images/back.png')}
                        style={{ width: 30, height: 30, tintColor: 'black' }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/*To Search the notes*/}
                <TextInput style={{ width: "80%", fontSize: 20, marginLeft: "2%", }} placeholder="Search"
                    value={data} />
            </View>

            <View style={{ flex: 9 }}>

            </View>

        </SafeAreaView>
    );
}