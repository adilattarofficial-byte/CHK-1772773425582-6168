from langchain_community.vectorstores import FAISS
from rag.ingest import load_pdf, split_documents
from rag.embeddings import get_embeddings


def build_vector_store(pdf_path):

    pages = load_pdf(pdf_path)
    print("Pages loaded:", len(pages))   

    chunks = split_documents(pages)
    print("Chunks created:", len(chunks))   

    embeddings = get_embeddings()

    vector_store = FAISS.from_documents(chunks, embeddings)

    return vector_store