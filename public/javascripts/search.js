var originalentries = null;
window.onload = function() {
    // Look for input box and insert key handler
    var prevTxt = null;
    var txt = document.getElementsByName('filterTxt');
    if ( txt != null ) {
        txt[0].onkeyup=function(event) {
            var e = event || window.event;
            var curTxt = txt[0].value;
            handleKeyPress(prevTxt,curTxt);
            prevTxt = curTxt;
            return true;
        }
    }
}

function handleKeyPress(oldVal, newVal) {
    var components = document.getElementsByName('person');
    var select = components[0];

    // Store the original list of entries to restore when backspacing
    if ( originalentries === null ) {
        originalentries = new Array();
        for ( c = 0; c < select.children.length; c++ ) {
            originalentries.push(select.children[c]);
        }
    }

    // If the number of characters in the text box is less than last time
    // it must be because the user pressed delete
    if ( oldVal !== null && (newVal.length < oldVal.length) ) {
        // Restore the lists original set of entries
        // and start from the beginning
        for ( c = 0; c < originalentries.length ; c++ ) {
            select.add(originalentries[c]);
        }
    }

    // Break out all of the parts of the search text
    // by splitting on white space
    var parts = newVal.split(' ');

    // Filter out the entries that don't contain the entered text
    var toremove= new Array();
    for ( i = 0; i < select.children.length; i++ ) {
        var entry = select.children[i];
        var match = true;
        var entryTxt = entry.text;
        for ( p = 0; p < parts.length; p++ ) {
            // The entry needs to contain all portions of the
            // search string *but* in any order
            var part = parts[p].toUpperCase();
            if ( entryTxt.toUpperCase().lastIndexOf(part) < 0 ) {
                match = false;
                break;
            }
        }

        if ( match == false ) {
            toremove.push(entry);
        }
    }

    if ( toremove != null ) {
        for ( t = 0; t < toremove.length; t++ ) {
            var entryTxt = toremove[t].text;
            select.removeChild(toremove[t]);
        }
    }
}