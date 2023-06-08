# import sys

# # Read the input from command-line arguments
# input_data = sys.argv[1]

# # Perform some computation or processing
# output_data = input_data.upper()

# # Print the output to be captured by the server
# print(output_data)



# import sys

# # Get the input from command line arguments
# input_data = sys.argv[1]

# # Process the input
# result = f"I am from Python: {input_data}"

# # Print the result
# print(result)



# import sys

# try:
#     # Read the input from command-line arguments
#     input_data = sys.argv[1]

#     # Perform some computation or processing
#     output_data = input_data.upper()

#     # Print the output to be captured by the server
#     print(output_data)
# except Exception as e:
#     print(f"Error processing data: {str(e)}", file=sys.stderr)




# import sys

# try:
#     # Read the input from command-line arguments
#     input_data = sys.argv[1]

#     # Perform some computation or processing
#     output_data = input_data.upper()

#     # Print the output to be captured by the server
#     print(output_data)
# except Exception as e:
#     print("Error processing data: " + str(e), file=sys.stderr)




# import sys

# try:
#     # Read the input from command-line arguments
#     input_data = sys.argv[1]

#     # Perform some computation or processing
#     output_data = input_data.upper()

#     # Print the output to be captured by the server
#     print(output_data)
# except Exception as e:
#     print("Error processing data: %s" % str(e), file=sys.stderr)



### This is for the python vershion 2.7.18--> Need to modify the code accordingly... upper commented vershions are for 3 and 3.6 above

import sys

try:
    # Read the input from command-line arguments
    input_data = sys.argv[1]

    # Perform some computation or processing
    output_data = input_data.upper() + ' niki hellow from python '

    # Print the output to be captured by the server
    print output_data
except Exception as e:
    print >> sys.stderr, "Error processing data: %s" % str(e)
