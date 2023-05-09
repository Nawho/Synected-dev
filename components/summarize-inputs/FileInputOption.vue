<template>
    <h3 class="text-center">Input the text document you want summarized.</h3>
    <div class="mt-3 flex flex-col items-center">
        <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs"
            accept=".txt .odt .docx .doc .pdf" />
        <p class="text-sm text-gray-300 font-light mt-1">Supported formats are: .pdf .docx .doc .odt and .txt</p>
    </div>
</template>