/* =============================
   File name: 
   Description: 
   Usage: cscript 
   © Kalen Dubrick 2012
   ============================= */

// call initialize()
initialize();

/* ---------------------------- */
/* beginning of your code       */
/* ---------------------------- */

// declaration if any

// Constants
var RECIPE_DATA_FILE = "recipes.txt"
// Other variables
var recipleFile;
var fso;

// try to get recipes
getRecipeFile();


// input

// processing if any

// output


/* ---------------------------- */
/* end of your code             */
/* ---------------------------- */

function getRecipeFile()
{
	fso = getFileSystemObject();

	switch (WScript.Arguments.Count())
	{
		case 0:
			// no file was passed via commandline, so we will 
			// try to open a file in the current directory.
			try
			{
				recipeFile = fso.OpenTextFile(RECIPE_DATA_FILE, ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there is nothing we can use
				writeLine("Error: No files passed and " + RECIPE_DATA_FILE + " does not exist in the current directory.");
			}
			break;
		case 1:
			// a file was passed, so we will try to open it
			try
			{
				recipeFile = fso.OpenTextFile(WScript.Arguments.Item(0), ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there was a problem with the filename passed,
				// so we will try to open a file in the current directory
				try
				{
					recipeFile = fso.OpenTextFile(RECIPE_DATA_FILE, ForReading, false, DEFAULT_MODE);
				}
				catch (err)
				{
					// there is nothing we can use
					writeLine("Error: There is a problem with the filename passed and " + RECIPE_DATA_FILE + " does not exist in the current directory.");
				}
			}
			break;
		default:
			// more than one file was passed - we will let the user
			// know and try to open the first one
			try
			{
				writeLine("You passed too many files.  Only the first will be used.");
				recipeFile = fso.OpenTextFile(WScript.Arguments.Item(0), ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there was a problem with the filename passed,
				// so we will try to open a file in the current directory
				try
				{
					recipeFile = fso.OpenTextFile(RECIPE_DATA_FILE, ForReading, false, DEFAULT_MODE);
				}
				catch (err)
				{
					// there is nothing we can use
					writeLine("Error: There is a problem with the filename passed and " + RECIPE_DATA_FILE + " does not exist in the current directory.");
				}
			}
	}
}

/* ============================
   DO NOT CHANGE THE CODE BELOW
   This code only runs in Windows environments
   ============================ */

// --- constants for file system object ---
var ForReading;
var ForWriting;
var ForAppending;

var FOR_READING;
var FOR_WRITING;
var FOR_APPENDING;

var DEFAULT_MODE;
var UNICODE_MODE;
var ASCII_MODE;

// --- initialize function ---
function initialize()
{
	ForReading = FOR_READING = 1;
	ForWriting = FOR_WRITING = 2;
	ForAppending = FOR_APPENDING = 8;

	DEFAULT_MODE = -2; // Opens the file using the system default.
	UNICODE_MODE = -1; // Opens the file as Unicode.
	ASCII_MODE = 0; // Opens the file as ASCII.
}


// --- read function ---
// input a single character from the standard input device
//
function read()
{
	return WScript.stdIn.Read(1); // just to read one character
}

// --- read function ---
// input a line from the standard input device
//
function readLine()
{
	return WScript.stdIn.ReadLine();
}

// --- write function ---
// output what's store in content without a newline at the end
//
function write(content)
{
	WScript.stdOut.Write(content);
}

// --- writeLine function ---
// output what's store in content with a newline at the end
//
function writeLine(content)
{
	WScript.stdOut.WriteLine(content);
}

// --- getFileSystemObject function ---
// instantiate and return a file system object
//
function getFileSystemObject()
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	return fso;
}

/* ============================ */
/* © Keyuan Jiang 2011          */
/* ============================ */
