# Northwestern University TeamDynamix Extension
TeamDynamix is a whole lot more functional than Footprints ever was, but the bar was through the floor.

There's still some room for improvement, and this extension adds some quality-of-life changes to TeamDynamix.

## Features

### Dark Theme (beta)
The extension can apply a dark theme to TeamDynamix. 

![Dark Mode screenshot](https://user-images.githubusercontent.com/5050363/207781780-dff86177-9ddc-4fa1-a22e-274ea539d4fe.jpg)


There is a 100% chance that there are areas of TeamDynamix that I didn't explore while creating this feature 
and therefore there will be some UI anomalies. If there is any part of the application that is completely illegible as a result of the new theming, disable the
extension entirely or go to the extension options and disable dark mode. Please report issues to me on Microsoft Teams or submit an issue to this GitHub 
repository with as much detail as possible.

**Note:** Dark mode will affect printing tickets. In order to print tickets such that they are still readable, you will have to uncheck "Background graphics" in the print dialog.

### Fewer New Windows (alpha)
TeamDynamix _loves_ to create new windows instead of new tabs. Much of the web application has been specifically 
coded to always create a new window and not to allow for any override to open in a new tab instead.

There were probably some good reasons for this behavior, but having so many different windows can feel cluttered.

The extension makes the following changes to what opens in new windows vs. new tabs vs. the current tab.

| **Action** | **Behavior Before** | **Behavior Now** |
| --- | --- | --- |
| Open ticket from a report or filter | New window | New tab |
| Open your user profile | New window | New tab |
| Update/edit a ticket | New window | **Same** tab |
| Generate Bomgar session | New window | New tab |
| Reassign service request | New window | **Same** tab |
| Edit classification | New window | **Same** tab | 
| Create parent | New window | **Same** tab | 
| Set parent | New window | **Same** tab |
| Copy service request | New window | New tab |
| Create service request template | New window | **Same** tab |
| Merge ticket | New window | **Same** tab |
| Forward | New window | **Same** tab |
| Assign workflow | New window | **Same** tab |
| Add new task | New window | New window |
| Add task template | New window | New window |
| Add alert | New window | New window |
| Add attachment | New window | New window |
| View user's assignments | New window | New window |
| View group's assignments | New window | New window |
| Add a new comment | New window | New window |
| Edit desktop | New window | New tab |
| New ticket | New window | New tab |

This feature can be disabled in the extension options.

### New Favicon
The extension can apply a new, NU purple-themed favicon to TeamDynamix pages. This can be disabled in the extension options.

### Ticket Shortcuts
Type "tdx" and a space into the Chrome omnibox and then type a ticket number and press enter. You will be taken directly to the ticket.

You can also select text on a webpage corresponding to a ticket number, then right-click and "Jump to TDx ticket".

## Installation
The extension is available for installation in Google Chrome [here](#).

## Usage
Adjusting the extension's settings can be done as follows:

![Select "Extensions" on the Chrome menu bar, then click the three dots next to "Northwestern TDx Extension", then select "Options"](https://user-images.githubusercontent.com/5050363/207781300-6a33936d-80b8-4603-886a-11fc5082b9bd.png)


## Contributing
Please feel free to submit [bug reports](https://github.com/scolton99/tdx-extension/issues), [feature requests](https://github.com/scolton99/tdx-extension/issues), or pull requests to this repository.
