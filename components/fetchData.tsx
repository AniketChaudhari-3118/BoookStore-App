import { useState } from "react";
import { View, ActivityIndicator } from "react-native";

export interface Book {
    id: string;
    imageUrl: String;
    title: string;
    authorName: string;
    discountPrice: number;
    actualPrice: number;
    Liked: Boolean;
    AddToCart: Boolean;
}

// fetchData.ts
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/v1/fetch'); // Replace with your API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data as Book[]; // Type the data as Book[]
    } catch (error) {
        console.error('Error fetching data: ', error);
        return []; // Return an empty array on error
    }
};
