package com.learnjava;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {

    public static void main(String[] args) {
        File file = new File("C:\\Users\\chunw\\Desktop\\AoC\\Puzzle1\\Puzzle1.txt");
        Scanner scanFile = null;
        try {
            scanFile = new Scanner(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        int[] arrNumbers = new int[200];
        for (int i = 0; scanFile.hasNext(); i++) {
            arrNumbers[i] = Integer.parseInt(scanFile.nextLine());
        }
        IntStream hi = Arrays.stream(arrNumbers).sorted();
        System.out.println(hi);
    }
}
