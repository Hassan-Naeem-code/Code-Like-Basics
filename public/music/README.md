# 🎵 Christmas Music Files

This folder should contain the background music files for the platform.

## Required Files

Please add the following MP3 files to this directory:

1. **all-i-want-for-christmas.mp3**
   - Song: "All I Want for Christmas Is You"
   - Artist: Mariah Carey

2. **sarajevo-1224.mp3**
   - Song: "Christmas/Sarajevo 12/24" (Instrumental)
   - Artist: Trans-Siberian Orchestra

3. **we-wish-you-merry-christmas.mp3**
   - Song: "We Wish You a Merry Christmas"
   - Artist: Traditional

## How to Add Music Files

1. Download or obtain the MP3 files for the songs listed above
2. Rename them to match the exact filenames shown (including the `.mp3` extension)
3. Place them in this `/public/music/` directory
4. The music player will automatically detect and play them

## Music Player Features

- **Default State**: Music is OFF by default
- **User Control**: Users can enable/disable music using the floating button in the bottom-right corner
- **Playlist Loop**: Songs play one after another in a continuous loop
- **Volume Control**: Users can adjust volume from 0-100%
- **Track Navigation**: Skip forward/backward through the playlist
- **Persistent Settings**: Music preferences are saved in browser localStorage

## Note

If the audio files are not found, the music player will show a warning message but won't prevent the platform from functioning. Users will simply see: "⚠️ Add MP3 files to /public/music/"
