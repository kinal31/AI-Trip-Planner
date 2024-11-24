import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { SelectBudgetOptions, SelectTravelesList } from '../Constants/Option';
import { Button } from '@/components/ui/button';


const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([])

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = "AlzaSyLPhfgMJoYGtE6B22EbGbExDjtdIP1cNFj";

  const fetchSuggestions = async (value) => {
    if (value.length > 0) {
      try {
        const response = await axios.get(API_URL, {
          params: {
            input: value,
            key: API_KEY,
          },
        });
        setSuggestions(response.data.predictions || []);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleChange = (name,value) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      handleSelect(suggestions[activeSuggestionIndex]);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleBlur = () => {
    // Close the dropdown after a small delay to allow click to register
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl my-3 font-medium '>What is destination of choice?</h2>

          <div style={{ position: "relative" }}>
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Search places..."
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
            {isDropdownOpen && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSelect(suggestion)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor:
                        index === activeSuggestionIndex ? "#f0f0f0" : "#fff",
                    }}
                  >
                    <strong>
                      {suggestion.description.substring(
                        0,
                        inputValue.length
                      )}
                    </strong>
                    {suggestion.description.substring(inputValue.length)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input type='number' placeholder='Ex:3' />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => {
              return (
                <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              );
            })}
          </div>

        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => {
              return (
                <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <div className='my-10 flex justify-end'>
        <Button>Generate Trip</Button>
      </div>

    </div>
  )
}

export default CreateTrip
