import os
from langchain_community.vectorstores import FAISS

from rag.ingest import load_pdf, split_documents
from rag.embeddings import embeddings


def build_vector_store(folder_path):

    all_pages = []

    # loop through all PDFs
    for file in os.listdir(folder_path):

        if file.endswith(".pdf"):

            pdf_path = os.path.join(folder_path, file)

            pages = load_pdf(pdf_path)

            all_pages.extend(pages)

    chunks = split_documents(all_pages)

    vector_store = FAISS.from_documents(chunks, embeddings)

    return vector_store