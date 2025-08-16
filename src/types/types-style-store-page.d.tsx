export type StyleStorePage = {
    Theme: 'dark' | 'light';
    backgroundColor: string;
    primaryColor: string;
    textButtonColor: string;
};

export type BottomNavProps = {
    initialBackgroundColor: 'white' | 'black';
    initialButtonColor: string;
    initialTextColorButtons: 'white' | 'black';
    backgroundColorStore: 'white' | 'black';
    setBackgroundColor: (color: 'white' | 'black') => void;
    buttonColor: string;
    setButtonColor: (color: string) => void;
    textColorButtons: 'white' | 'black';
    setTextColorButtons: (color: 'white' | 'black') => void;
};


