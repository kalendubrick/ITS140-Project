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
var RECIPE_DATA_FILE = "recipes.txt";
var MENU_QUIT = 4;
// Other variables
var recipes = new Array();
var recipeChoices = new Array("none", "none", "none");
var recipeFile;
var menuChoice = -1;

// try to get recipes
try
{
	recipeFile = getRecipeFile(RECIPE_DATA_FILE);
	writeLine("Recipes loaded successfully!");
	writeLine();
}
catch (err) {}

// load recipes into the array
loadRecipes(recipeFile, recipes);

// print the recipes
// printRecipes(recipes);

// get the user's menu choice if it wasn't already set to MENU_QUIT by errors opening a file
if (menuChoice != MENU_QUIT)
	menuChoice = displayMenu();

while (menuChoice != MENU_QUIT)
{
	switch(menuChoice)
	{
		// select recipes to use
		case 1:
			selectRecipes(recipes, recipeChoices);
			break;
		// show the user their selected recipes
		case 2:
			printRecipes(recipes, recipeChoices);
		// make a shopping list from selected recipes
		case 3:
			generateShoppingList(recipes, recipeChoices);
			break;
		default:
			writeLine("You picked an invalid option.  Please pick again.");

	}
}


/* ---------------------------- */
/* end of your code             */
/* ---------------------------- */

function getRecipeFile(defaultFile)
{
	var fso = getFileSystemObject();
	var file;

	switch (WScript.Arguments.Count())
	{
		case 0:
			// no file was passed via commandline, so we will 
			// try to open a file in the current directory.
			try
			{
				file = fso.OpenTextFile(defaultFile, ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there is nothing we can use
				writeLine("Error: No files passed and " + defaultFile + " does not exist in the current directory.");
				menuChoice = 4;
			}
			break;
		case 1:
			// a file was passed, so we will try to open it
			try
			{
				file = fso.OpenTextFile(WScript.Arguments.Item(0), ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there was a problem with the filename passed,
				// so we will try to open a file in the current directory
				try
				{
					file = fso.OpenTextFile(defaultFile, ForReading, false, DEFAULT_MODE);
				}
				catch (err)
				{
					// there is nothing we can use
					writeLine("Error: There is a problem with the filename passed and " + defaultFile + " does not exist in the current directory.");
					menuChoice = 4;
				}
			}
			break;
		default:
			// more than one file was passed - we will let the user
			// know and try to open the first one
			writeLine("You passed too many files.  Only the first will be used.");
			try
			{
				file = fso.OpenTextFile(WScript.Arguments.Item(0), ForReading, false, DEFAULT_MODE);
			}
			catch (err)
			{
				// there was a problem with the filename passed,
				// so we will try to open a file in the current directory
				try
				{
					file = fso.OpenTextFile(defaultFile, ForReading, false, DEFAULT_MODE);
				}
				catch (err)
				{
					// there is nothing we can use
					writeLine("Error: There is a problem with the filename passed and " + defaultFile + " does not exist in the current directory.");
					menuChoice = 4;
				}
			}
	}
	return file;
}

function loadRecipes(file, recipeArray)
{
	var temp;
	var title;
	var index = 0;

	while(!file.AtEndOfStream)
	{
		// temp = file.readLine();
		// let's make sure this is working
		// writeLine(temp);

		// get the title
		title = file.readLine();

		// create subarray with the recipe title as location
		recipeArray[title] = new Array();

		temp = file.readLine();

		// read the ingredients and directions into the subarray
		while (temp != "RECIPE" && !file.AtEndOfStream)
		{
			recipeArray[title][index] = temp;
			index++;
			temp = file.readLine();
		}

		// debug
		writeLine("Inside the loop, " + title + "'s length is " + recipeArray[title].length);

		// reset index to 0 for the next go-around
		index = 0;
	}

	// debug
	for (recipe in recipeArray)
	{
		writeLine("Outside the loop, " + recipe + "'s length is " + recipe.length);
	}

	// make sure to close the file
	file.Close();
}

function printRecipes(recipeArray)
{
	for (recipe in recipeArray)
	{
		writeLine("==================");
		writeLine("Title: " + recipe);
		writeLine();

		for (var i = 0; i < recipe.length; i++)
		{
			switch(recipeArray[recipe][i])
			{
				case "INGREDIENTS":
					writeLine("Ingredients");
					writeLine("-----------");
					break;
				case "DIRECTIONS":
					writeLine("Directions");
					writeLine("-----------");
					break;
				default:
					writeLine(recipeArray[recipe][i]);
			}
		}

		writeLine();
	}
}

function displayMenu()
{
	// Declarations
	var choice;

	writeLine();
	writeLine("Menu");
	writeLine("======");
	writeLine("1 - Select up tp 3 recipes to use");
	writeLine("2 - Display selected recipes");
	writeLine("3 - Generate shopping list");
	writeLine("4 - Quit");
	writeLine();
	write("Please pick an option [1,2,3,4]: ");

	choice = readLine();
	return choice;
}

function selectRecipes(recipeArray, recipeChoiceArray)
{
	
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
