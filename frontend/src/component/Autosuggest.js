import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest'



// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters


class FilterSearch extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

     getSuggestions = (value) => {
        let escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        console.log(this.props.data);

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = this.props.data.filter(asset => regex.test(asset.name));

        if (suggestions.length === 0) {
            return [
                { isAddNew: true }
            ];
        }

        return suggestions;
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    getSuggestionValue = suggestion => {
        if (suggestion.isAddNew) {
            return this.state.value;
        }

        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        if (suggestion.isAddNew) {
            return (
                <span>
          [+] Add new: <strong>{this.state.value}</strong>
        </span>
            );
        }

        return suggestion.name;
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        if (suggestion.isAddNew) {
            console.log('Add new:', this.state.value);
        }
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
            />
        );
    }
}

export default FilterSearch