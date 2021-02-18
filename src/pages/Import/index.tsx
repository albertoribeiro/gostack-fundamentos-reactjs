import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [uploadError, setUploadError] = useState('');
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    uploadedFiles.map(uploadedFile => {
      data.append('file',uploadedFile.file);
    })

    try {
      await api.post('/transactions/import', data);
      setUploadedFiles([]); 
    } catch (err) {
      setUploadError(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
 

    const uploadedFiles = files.map( (file:File) =>{ 

      if (file.type !== 'text/csv'){
        setUploadError('Suportd only csv files.');
      }
      const {name,size} = file
      const sizeF = size.toString();
      const fileup:FileProps = { file, name, readableSize : sizeF  } ;

      return fileup;
    });
     
    setUploadedFiles(uploadedFiles); 
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button disabled={uploadedFiles.length>0}  onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
