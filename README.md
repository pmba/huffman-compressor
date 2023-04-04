# Huffman-Based File Compressor

This is a file compressor built using the Huffman coding algorithm and implemented with HTML, Tailwind, and Typescript. Huffman coding is a lossless data compression algorithm that takes advantage of the frequency of characters in a data stream to compress it into a more compact form.

## Huffman Coding Algorithm

The Huffman coding algorithm works by first calculating the frequency of each character in the input data stream. Then, it constructs a binary tree where each leaf node represents a character and its weight is equal to its frequency. The tree is constructed by repeatedly combining the two nodes with the smallest weights until all nodes are combined into a single root node.

Once the binary tree is constructed, each character in the input data stream can be encoded using the unique path from the root to its corresponding leaf node. Characters that occur more frequently will have shorter paths, resulting in a more compact encoding. The encoded data can be then decoded using the same binary tree.

## How to Execute the Project

1. Clone the repository by running `git clone https://github.com/pmba/huffman-compressor` in your terminal or by downloading the zip file and extracting it to your preferred location.

2. Open a terminal window and navigate to the cloned repository folder.

3. Run `yarn` to install the dependencies required by the project.

4. Run `yarn dev` to start the development server.

5. Open your web browser and go to the vite's local URL to view the application.
