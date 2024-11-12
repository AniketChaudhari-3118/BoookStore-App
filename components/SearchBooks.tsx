
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
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { fetchBooks, Book } from './fetchData';

// import { fetchBooks } from './fetchData'



export const SearchBooks = (props: any) => {

    const [query, setQuery] = useState(''); // Search query
    const [books, setBooks] = useState<Book[]>([]); // Type books as Book[]
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // Type filteredBooks as Book[]

    const [liked, setLiked] = useState(false); // Initial state is unliked
    const toggleLike = () => {
        setLiked(prevLiked => !prevLiked); // Toggle between liked and unliked
    };


    // Fetch the books when the component mounts
    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchBooks(); // Fetch data from the server
            setBooks(data);
            setFilteredBooks(data); // Initially, set filteredBooks to all books
        };
        loadBooks();
    }, []);


    // Filter books whenever the query changes
    useEffect(() => {
        if (query.trim() === '') {
            setFilteredBooks([]); // If query is empty, show empty array
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const results = books.filter(book =>
                book.title.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredBooks(results);
        }
    }, [query, books]);

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
                    value={query} onChangeText={setQuery} />
            </View>

            <View style={{ flex: 9 }}>

                {/* Scrollable Book Items List */}
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: "3%", paddingTop: "2%" }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {
                            filteredBooks.map((item: any) => (
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


            </View>

        </SafeAreaView>
    );
}