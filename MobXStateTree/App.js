import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import BookStore from './BookStore'
import { observer } from 'mobx-react'


const initialState = {
  title: '',
  author: ''
}

@observer
export default class App extends React.Component {

  state = initialState

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }


  addBook() {
    BookStore.addBook(this.state)
    this.setState(initialState)
  }

  toggleRead(book) {
    book.toggleRead()
  }

  delete(book) {
    BookStore.removeBook(book)
  }

  render() {
    const { books } = BookStore
    console.log('ReadBooks ', BookStore.readBooks)
    console.log('Books by Andy Hunt: ', BookStore.booksByAuthor('Andy Hunt'))
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={value => this.onChangeText('title', value)}
        />
        <TextInput
          style={styles.input}
          onChangeText={value => this.onChangeText('author', value)}
        />
        <Button onPress={this.addBook.bind(this)} title='Add Book' />
        {
          books.map((book, index) =>
            <View>
              <Text key={index}>{book.title}</Text>
              <Text onPress={() => this.toggleRead(book)} key={index}>Read: {book.read ? 'Yes' : 'No'}</Text>
              <Text onPress={() => this.delete(book)}>Delete</Text>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
