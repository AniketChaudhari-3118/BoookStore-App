/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export const HomePage = (props: any) => {

    const [liked, setLiked] = useState(false); // Initial state is unliked
    const [books, setBooks] = useState([]); // To store the retrived data
    const [loading, setLoading] = useState(true);

    const toggleLike = () => {
        setLiked(prevLiked => !prevLiked); // Toggle between liked and unliked
    };

    //fetch the books data from mongoDb
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://10.0.2.2:5000/api/v1/fetch'); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBooks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(); // Call the fetchBooks function when the component mounts
        console.warn(books);
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" style={{ transform: [{ scale: 1.5 }] }} />
            </View>
        );
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* Upper bar */}
            <View style={{ flexDirection: 'row', height: "10%", shadowColor: 'black', elevation: 2, alignItems: 'center', paddingHorizontal: "3%" }}>

                {/* Book Icon */}
                <Image style={{ height: "60%", width: "10%", marginRight: "3%" }}
                    source={require('./images/book.png')}
                />

                {/* Bookstore Text */}
                <Text style={{ fontSize: 24, fontWeight: 'bold', flex: 1 }}>Book Store</Text>

                {/* Search, Like, and Cart Icons */}
                <TouchableOpacity onPress={() => props.navigation.navigate('SearchBooks')}
                    style={{ height: "55%", width: "12%", marginTop: "3%", marginRight: "2%" }}>
                    <Image style={{ height: "80%", width: "80%" }}
                        source={require('./images/search.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{ height: "55%", width: "12%", marginTop: "3%", marginRight: "2%" }}>
                    <Image style={{ height: "80%", width: "80%" }}
                        source={require('./images/heart.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{ height: "55%", width: "12%", marginTop: "3%", marginRight: "2%" }}>
                    <Image style={{ height: "80%", width: "80%" }}
                        source={require('./images/cart.png')}
                    />
                </TouchableOpacity>

            </View>


            {/* Scrollable Book Items List */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: "3%", paddingTop: "2%" }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        books.map((item: any) => (

                            <TouchableOpacity style={{ height: 315, width: "48%", alignSelf: 'center', marginTop: "5%", borderWidth: 1, }}>

                                <Image style={{ height: "60%", width: "65%", alignSelf: 'center', marginTop: "5%" }}
                                    source={item.imageUrl}
                                />

                                <Text style={{ fontSize: 20, marginLeft: "3%", marginTop: "2%", fontWeight: '500' }} numberOfLines={1}>{`${item.title}`}</Text>

                                <Text style={{ fontSize: 15, marginLeft: "4%", }} numberOfLines={1}>{`${item.authorName}`}</Text>

                                <Text style={{ fontSize: 15, marginLeft: "2%" }}>
                                    {` Rs ${item.discountPrice} `}
                                    <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>
                                        {`Rs ${item.actualPrice}`}
                                    </Text>
                                </Text>

                                <View style={{ flexDirection: 'row', height: "10%" }}>

                                    <TouchableOpacity onPress={toggleLike} style={{ borderWidth: 1, height: "100%", width: "25%", marginLeft: "5%", marginTop: "5%" }}>
                                        <Image style={{ height: "85%", width: "85%", marginHorizontal: "2%", alignSelf: 'center', margin: "5%", }}
                                            source={
                                                liked
                                                    ? require('./images/ColorHeart.png') // Red heart for liked
                                                    : require('./images/heart.png') // Gray heart for unliked
                                            }
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ borderWidth: 1, height: "100%", width: "62%", marginTop: "5%", marginLeft: "5%", backgroundColor: 'brown' }}>
                                        <Text style={{ fontSize: 16, textAlign: 'center', color: 'white', marginTop: "4%" }}>Add to cart</Text>
                                    </TouchableOpacity>

                                </View>

                            </TouchableOpacity>
                        ))
                    }
                </View>

            </ScrollView>



        </SafeAreaView>

    );
}
